import React, { useState, FormEvent } from 'react';

interface AuthProps {
  onLogin: (user: string, pass: string) => boolean;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Por favor, preencha o usuário e a senha.');
      return;
    }

    const success = onLogin(username, password);
    if (!success) {
      setError('Usuário ou senha inválidos.');
    }
  };
  
  const inputStyles = "mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-sm shadow-sm placeholder-muted text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500";


  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-lg shadow-2xl shadow-black/30">
      <h2 className="text-2xl font-bold mb-5 text-center text-page-title">
        Acesso Administrativo
      </h2>
      
      <p className="text-center text-sm text-muted mb-4">
          Use <b>admin</b> / <b>admin123</b> para testar.
      </p>

      {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-body">Usuário (Login)</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
            required
            className={inputStyles}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-body">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="admin123"
            required
            className={inputStyles}
          />
        </div>
        <div className="pt-2">
            <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium btn-primary"
            >
            Entrar
            </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;