import React, { useState, FormEvent } from 'react';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: string, pass: string) => boolean;
  onRegister: (newUser: Omit<User, 'id' | 'role'>) => { success: boolean, message: string };
}

const Auth: React.FC<AuthProps> = ({ onLogin, onRegister }) => {
  const [isRegistering, setIsRegistering] = useState(false);

  // Campos do formulário
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Por favor, preencha o usuário e a senha.');
      return;
    }

    if (isRegistering) {
      if (!fullName || !phone) {
        setError('Por favor, preencha todos os campos para se cadastrar.');
        return;
      }
      const result = onRegister({ fullName, phone, username, password });
      if (!result.success) {
        setError(result.message);
      }
      // O App lida com o login automático, então não é necessária nenhuma ação de sucesso aqui
    } else {
      const success = onLogin(username, password);
      if (!success) {
        setError('Usuário ou senha inválidos.');
      }
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setError('');
    setUsername('');
    setPassword('');
    setFullName('');
    setPhone('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg sticky top-8">
      <h2 className="text-2xl font-bold mb-5 text-center text-slate-700">
        {isRegistering ? 'Cadastro de Colaborador' : 'Acesso Administrativo'}
      </h2>
      
      {!isRegistering && (
        <p className="text-center text-sm text-slate-500 mb-4">
            Use <b>admin</b> / <b>admin123</b> para testar.
        </p>
      )}

      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegistering && (
          <>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-600">Nome Completo</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Seu nome completo"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-600">Telefone Celular</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(00) 00000-0000"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>
          </>
        )}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-slate-600">Usuário (Login)</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={isRegistering ? "Escolha um nome de usuário" : "admin"}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-600">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={isRegistering ? "••••••••" : "admin123"}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
        </div>
        <div className="pt-2">
            <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors duration-300"
            >
            {isRegistering ? 'Cadastrar' : 'Entrar'}
            </button>
        </div>
      </form>
      <div className="mt-4 text-center text-sm">
        <button onClick={toggleMode} className="font-medium text-sky-600 hover:text-sky-500">
          {isRegistering ? 'Já tem uma conta? Faça o login' : 'Não tem uma conta? Cadastre-se como Colaborador'}
        </button>
      </div>
    </div>
  );
};

export default Auth;