
import React from 'react';
import { User } from '../types';

interface AdminsManagementPageProps {
  users: User[];
  currentUser: User | null;
  onGoBackToAdmin: () => void;
  onDeleteUser: (userId: string) => void;
  onAddUserClick: () => void;
  onEditUser: (userId: string) => void;
}

const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const DeleteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.124-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.077-2.09.921-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);

const EditIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
  </svg>
);

const AdminsManagementPage: React.FC<AdminsManagementPageProps> = ({ users, currentUser, onGoBackToAdmin, onDeleteUser, onAddUserClick, onEditUser }) => {
  const admins = users.filter(u => u.role === 'Super Admin' || u.role === 'Admin');
  const collaborators = users.filter(u => u.role === 'Colaborador');

  const isSuperAdmin = currentUser?.role === 'Super Admin';
  const isAdmin = currentUser?.role === 'Admin';

  const checkCanDelete = (targetUser: User) => {
      if (!currentUser) return false;
      if (targetUser.role === 'Super Admin') return false; // Ninguém deleta Super Admin
      if (isSuperAdmin) return true; // Super Admin deleta todos (exceto Super Admin acima)
      if (isAdmin && targetUser.role === 'Colaborador') return true; // Admin deleta Colaborador
      return false;
  };

  const checkCanEdit = (targetUser: User) => {
      if (!currentUser) return false;
      if (currentUser.id === targetUser.id) return true; // Edita a si mesmo
      if (targetUser.role === 'Super Admin') return false; // Ninguém edita outro Super Admin
      if (isSuperAdmin) return true; // Super Admin edita todos
      if (isAdmin && (targetUser.role === 'Colaborador' || targetUser.role === 'Admin')) return true; // Admin edita Admins e Colabs
      return false;
  };

  return (
    <main className="container mx-auto p-4 lg:p-8 animate-fade-in-up">
      <div className="mb-6">
        <button
          onClick={onGoBackToAdmin}
          className="flex items-center text-sm font-medium text-section-title hover:opacity-80 transition-colors"
        >
          <ArrowLeftIcon />
          Voltar para o Painel de Imóveis
        </button>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-page-title">Gerenciar Usuários</h1>
        <button
            onClick={onAddUserClick}
            className="px-5 py-2.5 text-sm font-medium rounded-md btn-primary"
        >
            Adicionar Novo Usuário
        </button>
      </div>
      
      <div className="space-y-8">
        {/* TABELA DE ADMINISTRADORES */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-2xl shadow-black/20 overflow-x-auto mb-8">
            <h3 className="text-xl font-semibold text-page-title p-4">Administradores</h3>
            <table className="w-full text-sm text-left text-body">
            <thead className="text-xs text-muted uppercase bg-slate-700/50">
                <tr>
                <th scope="col" className="px-6 py-3">Nome Completo</th>
                <th scope="col" className="px-6 py-3">Usuário (Login)</th>
                <th scope="col" className="px-6 py-3">Cargo</th>
                <th scope="col" className="px-6 py-3">Telefone</th>
                <th scope="col" className="px-6 py-3 text-center">Ações</th>
                </tr>
            </thead>
            <tbody>
                {admins.map(user => (
                <tr key={user.id} className="border-b border-slate-700 hover:bg-slate-800/40">
                    <th scope="row" className="px-6 py-4 font-medium text-page-title whitespace-nowrap">
                    {user.fullName}
                    </th>
                    <td className="px-6 py-4">{user.username}</td>
                    <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            user.role === 'Super Admin' ? 'bg-cyan-900/50 text-cyan-300' 
                            : 'bg-indigo-900/50 text-indigo-300'}`
                        }>
                            {user.role}
                        </span>
                    </td>
                    <td className="px-6 py-4">{user.phone}</td>
                    <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                        <button
                            type="button"
                            onClick={() => onEditUser(user.id)}
                            disabled={!checkCanEdit(user)}
                            className="p-2 rounded-full text-muted hover:bg-slate-700 hover:text-section-title transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title={!checkCanEdit(user) ? "Sem permissão" : "Editar"}
                        >
                            <EditIcon />
                        </button>
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); onDeleteUser(user.id); }}
                            disabled={!checkCanDelete(user)}
                            className="p-2 rounded-full text-muted hover:bg-slate-700 hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title={!checkCanDelete(user) ? "Sem permissão" : "Excluir"}
                        >
                            <DeleteIcon />
                        </button>
                    </div>
                    </td>
                </tr>
                ))}
                {admins.length === 0 && (
                <tr>
                    <td colSpan={5} className="text-center py-10 text-muted">
                    Nenhum administrador encontrado.
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>

        {/* TABELA DE COLABORADORES */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-2xl shadow-black/20 overflow-x-auto mb-8">
            <h3 className="text-xl font-semibold text-page-title p-4">Colaboradores</h3>
            <table className="w-full text-sm text-left text-body">
            <thead className="text-xs text-muted uppercase bg-slate-700/50">
                <tr>
                <th scope="col" className="px-6 py-3">Nome Completo</th>
                <th scope="col" className="px-6 py-3">Usuário (Login)</th>
                <th scope="col" className="px-6 py-3">Cargo</th>
                <th scope="col" className="px-6 py-3">Telefone</th>
                <th scope="col" className="px-6 py-3 text-center">Ações</th>
                </tr>
            </thead>
            <tbody>
                {collaborators.map(user => (
                <tr key={user.id} className="border-b border-slate-700 hover:bg-slate-800/40">
                    <th scope="row" className="px-6 py-4 font-medium text-page-title whitespace-nowrap">
                    {user.fullName}
                    </th>
                    <td className="px-6 py-4">{user.username}</td>
                    <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-slate-700 text-body">
                            {user.role}
                        </span>
                    </td>
                    <td className="px-6 py-4">{user.phone}</td>
                    <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                        <button
                            type="button"
                            onClick={() => onEditUser(user.id)}
                            disabled={!checkCanEdit(user)}
                            className="p-2 rounded-full text-muted hover:bg-slate-700 hover:text-section-title transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title={!checkCanEdit(user) ? "Sem permissão" : "Editar"}
                        >
                            <EditIcon />
                        </button>
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); onDeleteUser(user.id); }}
                            disabled={!checkCanDelete(user)}
                            className="p-2 rounded-full text-muted hover:bg-slate-700 hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title={!checkCanDelete(user) ? "Sem permissão" : "Excluir"}
                        >
                            <DeleteIcon />
                        </button>
                    </div>
                    </td>
                </tr>
                ))}
                {collaborators.length === 0 && (
                <tr>
                    <td colSpan={5} className="text-center py-10 text-muted">
                    Nenhum colaborador encontrado.
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
      </div>
    </main>
  );
};

export default AdminsManagementPage;