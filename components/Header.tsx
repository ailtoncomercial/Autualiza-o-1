import React from 'react';

interface HeaderProps {
  isAuthenticated: boolean;
  logoUrl: string;
  onLogout: () => void;
  onAdminClick: () => void;
  onLogoClick: () => void;
  onNavigateToAbout: () => void;
  onNavigateToContact: () => void;
  onNavigateToLocation: () => void; // Novo
  backgroundColor: string;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, logoUrl, onLogout, onAdminClick, onLogoClick, onNavigateToAbout, onNavigateToContact, onNavigateToLocation, backgroundColor }) => {
  return (
    <header 
        className="shadow-md sticky top-0 z-30"
        style={{ backgroundColor: backgroundColor }}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div 
          className="flex items-center cursor-pointer flex-shrink-0"
          onClick={onLogoClick}
          role="button"
          aria-label="Voltar para a página inicial"
        >
          <img 
            src={logoUrl}
            alt="DIGIFOX Logo" 
            className="h-16 w-auto"
          />
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 ml-4 hidden sm:block">
            DIGIFOX
          </h1>
        </div>
        
        <div className="flex items-center space-x-4 md:space-x-6">
            <button
                onClick={onNavigateToAbout}
                className="text-sm font-medium text-slate-700 hover:text-sky-600 transition-colors hidden sm:block"
            >
                Quem Somos
            </button>
            <button
                onClick={onNavigateToContact}
                className="text-sm font-medium text-slate-700 hover:text-sky-600 transition-colors hidden sm:block"
            >
                Contato
            </button>
            <button
                onClick={onNavigateToLocation}
                className="text-sm font-medium text-slate-700 hover:text-sky-600 transition-colors hidden sm:block"
            >
                Localização
            </button>
            {isAuthenticated ? (
            <div className="flex items-center space-x-4 flex-shrink-0">
                <button
                    onClick={onAdminClick}
                    className="px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
                >
                    Painel Admin
                </button>
                <button
                onClick={onLogout}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                Logout
                </button>
            </div>
            ) : (
            <button
                onClick={onAdminClick}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors flex-shrink-0"
            >
                Acesso Administrativo
            </button>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;