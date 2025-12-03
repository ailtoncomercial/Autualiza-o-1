
import React, { useState, FormEvent, useEffect } from 'react';
import { User } from '../types';

interface AddUserPageProps {
  onAddUser?: (newUser: Omit<User, 'id'>) => Promise<{ success: boolean, message: string }>;
  onUpdateUser?: (updatedUser: User) => void;
  onCancel: () => void;
  currentUser: User | null;
  userToEdit?: User | null;
}

const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const AddUserPage: React.FC<AddUserPageProps> = ({ onAddUser, onUpdateUser, onCancel, currentUser, userToEdit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'Admin' | 'Colaborador'>('Colaborador');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const isEditMode = !!userToEdit;

  useEffect(() => {
    if (isEditMode && userToEdit) {
        setFullName(userToEdit.fullName);
        setPhone(userToEdit.phone);
        setUsername(userToEdit.username);
        setRole(userToEdit.role as 'Admin' | 'Colaborador');
    }
  }, [isEditMode, userToEdit]);

  
  const inputStyles = "mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-sm shadow-sm placeholder-muted text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 disabled:opacity-50";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (isEditMode) {
        if (!fullName || !phone || !role) {
            setError('Por favor, preencha nome, telefone e cargo.');
            setIsSubmitting(false);
            return;
        }
        if (onUpdateUser && userToEdit) {
            const updatedUser: User = {
                ...userToEdit,
                fullName,
                phone,
                role,
                password: newPassword ? newPassword : userToEdit.password
            };
            await onUpdateUser(updatedUser);
        }
    } else {
        if (!fullName || !phone || !username || !password || !role) {
            setError('Por favor, preencha todos os campos.');
            setIsSubmitting(false);
            return;
        }
        if (onAddUser) {
            try {
                const result = await onAddUser({ fullName, phone, username, password, role });
                if (!result.success) {
                    setError(result.message);
                }
            } catch (err) {
                setError('Erro ao criar usuário.');
            }
        }
    }
    setIsSubmitting(false);
  };

  const availableRoles = () => {
    if (currentUser?.role === 'Super Admin') {
      return [{ value: 'Admin', label: 'Administrador'}, { value: 'Colaborador', label: 'Colaborador'}];
    }
    if (currentUser?.role === 'Admin') {
       return [{ value: 'Colaborador', label: 'Colaborador'}];
    }
    return [];
  }

  const isRoleChangeDisabled = isEditMode && (
    currentUser?.role === 'Admin' || // Admin cannot change roles
    userToEdit?.role === 'Super Admin' // Nobody can change Super Admin role
  );

  return (
    <main className="container mx-auto p-4 lg:p-8 flex justify-center items-start mt-4 sm:mt-8 md:mt-12 animate-fade-in-up">
      <div className="w-full max-w-md">
        <div className="mb-6">
            <button 
                onClick={onCancel}
                className="flex items-center text-sm font-medium text-section-title hover:opacity-80 transition-colors"
            >
                <ArrowLeftIcon />
                Voltar para Gerenciamento
            </button>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-lg shadow-2xl shadow-black/30">
          <h2 className="text-2xl font-bold mb-5 text-center text-page-title">
            {isEditMode ? 'Editar Usuário' : 'Adicionar Novo Usuário'}
          </h2>
          {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-body">Nome Completo</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nome completo do usuário"
                required
                className={inputStyles}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-body">Telefone Celular</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(00) 00000-0000"
                required
                className={inputStyles}
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-body">Usuário (Login)</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nome de usuário para login"
                required
                disabled={isEditMode}
                className={inputStyles}
              />
            </div>
             <div>
              <label htmlFor="password" className="block text-sm font-medium text-body">
                {isEditMode ? 'Nova Senha (deixe em branco para não alterar)' : 'Senha'}
              </label>
              <input
                type="password"
                id="password"
                value={isEditMode ? newPassword : password}
                onChange={(e) => isEditMode ? setNewPassword(e.target.value) : setPassword(e.target.value)}
                placeholder={isEditMode ? 'Digite uma nova senha' : 'Crie uma senha forte'}
                required={!isEditMode}
                className={inputStyles}
              />
            </div>
            <div>
                <label htmlFor="role" className="block text-sm font-medium text-body">Cargo</label>
                <select 
                    id="role" 
                    value={role} 
                    onChange={(e) => setRole(e.target.value as 'Admin' | 'Colaborador')} 
                    className={inputStyles}
                    disabled={isRoleChangeDisabled}
                >
                    {isEditMode && userToEdit?.role === 'Admin' && <option value="Admin">Administrador</option>}
                    {availableRoles().map(r => (
                        <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col space-y-2 pt-2">
                <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                {isSubmitting ? 'Salvando...' : (isEditMode ? 'Salvar Alterações' : 'Salvar Usuário')}
                </button>
                 <button type="button" onClick={onCancel} className="w-full flex justify-center py-2 px-4 border border-slate-600 rounded-md shadow-sm text-sm font-medium text-body bg-slate-700/50 hover:bg-slate-700">
                    Cancelar
                </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddUserPage;
