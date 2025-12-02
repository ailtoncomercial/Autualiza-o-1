import React from 'react';
import { User } from '../types';

interface AdminsManagementPageProps {
  users: User[];
  currentUser: User | null;
  onGoBackToAdmin: () => void;
  onDeleteUser: (userId: string) => void;
  onAddCollaboratorClick: () => void;
}

const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const DeleteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.124-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.077-2.09.921-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);


const AdminsManagementPage: React.FC<AdminsManagementPageProps> = ({ users, currentUser, onGoBackToAdmin, onDeleteUser, onAddCollaboratorClick }) => {
 
  return (
    <main className="container mx-auto p-4 lg:p-8">
      <div className="mb-6">
        <button
          onClick={onGoBackToAdmin}
          className="flex items-center text-sm font-medium text-sky-600 hover:text-sky-800 transition-colors"
        >
          <ArrowLeftIcon />
          Voltar para o Painel de Imóveis
        </button>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Gerenciar Usuários</h1>
        <button
            onClick={onAddCollaboratorClick}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
        >
            Adicionar Novo Colaborador
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-500">
          <thead className="text-xs text-slate-700 uppercase bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3">Nome Completo</th>
              <th scope="col" className="px-6 py-3">Usuário (Login)</th>
              <th scope="col" className="px-6 py-3">Cargo</th>
              <th scope="col" className="px-6 py-3">Telefone</th>
              <th scope="col" className="px-6 py-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="bg-white border-b hover:bg-slate-50">
                <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                  {user.fullName}
                </th>
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.role === 'Administrador' ? 'bg-sky-100 text-sky-800' : 'bg-slate-100 text-slate-800'}`}>
                        {user.role}
                    </span>
                </td>
                <td className="px-6 py-4">{user.phone}</td>
                <td className="px-6 py-4 text-center">
                   <button
                    onClick={() => onDeleteUser(user.id)}
                    disabled={user.role === 'Administrador'}
                    className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-500"
                    title={user.role === 'Administrador' ? "Não é possível excluir o admin principal" : "Excluir colaborador"}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-10 text-slate-500">
                  Nenhum usuário cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AdminsManagementPage;