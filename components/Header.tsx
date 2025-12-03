import React from 'react';

interface HeaderProps {
  isAuthenticated: boolean;
  logoUrl: string;
  logoText: string;
  showLogoText: boolean;
  backgroundColor: string;
  menuColor: string;
  menuHighlightColor: string;
  onLogout: () => void;
  onAdminClick: () => void;
  onLogoClick: () => void;
  onNavigateToAbout: () => void;
  onNavigateToContact: () => void;
  onNavigateToLocation: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isAuthenticated, 
  logoUrl, 
  logoText, 
  showLogoText, 
  backgroundColor,
  menuColor,
  menuHighlightColor,
  onLogout, 
  onAdminClick, 
  onLogoClick, 
  onNavigateToAbout, 
  onNavigateToContact, 
  onNavigateToLocation 
}) => {
  return (
    <header 
        className="shadow-md sticky top-0 z-30 backdrop-blur-sm border-b border-slate-700/50"
        style={{ backgroundColor }}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo (Esquerda) */}
        <div 
          className="flex items-center cursor-pointer flex-shrink-0 group"
          onClick={onLogoClick}
          role="button"
          aria-label="Voltar para a página inicial"
        >
          {logoUrl && (
            <img 
              src={logoUrl}
              alt="Logo" 
              className="h-10 sm:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          )}
          {showLogoText && (
            <h1 className="text-xl sm:text-2xl font-bold text-page-title ml-2 sm:ml-4 transition-colors duration-300 group-hover:text-section-title">
                {logoText}
            </h1>
          )}
        </div>
        
        {/* Menu de Navegação (Centro) */}
        <nav className="hidden md:flex items-center justify-center flex-grow space-x-12">
            <button
                onClick={onNavigateToAbout}
                className="relative group text-lg font-medium py-2"
                style={{ color: menuColor }}
            >
                <span>Quem Somos</span>
                <span 
                    className="absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center"
                    style={{ backgroundColor: menuHighlightColor }}
                ></span>
            </button>
            <button
                onClick={onNavigateToContact}
                className="relative group text-lg font-medium py-2"
                style={{ color: menuColor }}
            >
                <span>Contato</span>
                <span 
                    className="absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center"
                    style={{ backgroundColor: menuHighlightColor }}
                ></span>
            </button>
            <button
                onClick={onNavigateToLocation}
                className="relative group text-lg font-medium py-2"
                style={{ color: menuColor }}
            >
                <span>Localização</span>
                <span 
                    className="absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center"
                    style={{ backgroundColor: menuHighlightColor }}
                ></span>
            </button>
        </nav>
        
        {/* Botões Administrativos (Direita) */}
        <div className="flex items-center space-x-4 flex-shrink-0">
            {isAuthenticated ? (
            <div className="flex items-center space-x-4">
                <button
                    onClick={onAdminClick}
                    className="px-4 py-2 border border-slate-600 text-sm font-medium rounded-md text-body bg-slate-700/50 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 transition-all duration-300"
                >
                    Painel Admin
                </button>
                <button
                onClick={onLogout}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600/80 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-red-500 transition-colors"
                >
                Logout
                </button>
            </div>
            ) : (
            <button
                onClick={onAdminClick}
                className="px-5 py-2.5 text-sm font-medium rounded-md btn-primary"
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