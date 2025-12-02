
import React from 'react';
import Auth from './Login';
import { User } from '../types';

interface LoginPageProps {
  onLogin: (user: string, pass: string) => boolean;
  onRegister: (newUser: Omit<User, 'id'>) => { success: boolean, message: string };
  onGoBackToHome: () => void;
}

const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onRegister, onGoBackToHome }) => {
  return (
    <main className="container mx-auto p-4 lg:p-8 flex justify-center items-start mt-4 sm:mt-8 md:mt-12">
      <div className="w-full max-w-md">
        <div className="mb-6">
            <button 
                onClick={onGoBackToHome}
                className="flex items-center text-sm font-medium text-sky-600 hover:text-sky-800 transition-colors"
            >
                <ArrowLeftIcon />
                Voltar para a Home
            </button>
        </div>
        <Auth onLogin={onLogin} onRegister={onRegister} />
      </div>
    </main>
  );
};

export default LoginPage;
