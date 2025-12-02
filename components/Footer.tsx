import React from 'react';
import { SiteSettings } from '../types';

interface FooterProps {
    settings: SiteSettings;
    backgroundColor: string;
    onNavigateToAbout: () => void;
    onNavigateToContact: () => void;
    onNavigateToLocation: () => void; // Novo
}

const Footer: React.FC<FooterProps> = ({ settings, backgroundColor, onNavigateToAbout, onNavigateToContact, onNavigateToLocation }) => {
    return (
        <footer 
            className="text-slate-300 mt-16"
            style={{ backgroundColor: backgroundColor }}
        >
            <div className="container mx-auto px-4 py-8 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
                    <div className="md:col-span-2">
                        <h3 className="text-lg font-bold text-white mb-2">DIGIFOX Imóveis</h3>
                        <p className="text-sm">Encontrando o seu lugar no mundo.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">Institucional</h3>
                        <ul className="space-y-2">
                           <li>
                             <button onClick={onNavigateToAbout} className="text-sm text-slate-300 hover:text-sky-400 transition-colors">
                                Quem Somos
                             </button>
                           </li>
                           <li>
                             <button onClick={onNavigateToContact} className="text-sm text-slate-300 hover:text-sky-400 transition-colors">
                                Contato
                             </button>
                           </li>
                           <li>
                             <button onClick={onNavigateToLocation} className="text-sm text-slate-300 hover:text-sky-400 transition-colors">
                                Localização
                             </button>
                           </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">Siga-nos</h3>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <a href={settings.footerFacebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors">Facebook</a>
                            <a href={settings.footerInstagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors">Instagram</a>
                            <a href={settings.footerLinkedInUrl} target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors">LinkedIn</a>
                        </div>
                    </div>
                </div>
                 <div className="mt-8 border-t border-slate-700 pt-6 text-center text-sm">
                     <p><b>Contato:</b> {settings.footerContactEmail} | {settings.footerContactPhone}</p>
                    <p className="mt-2">&copy; {new Date().getFullYear()} DIGIFOX. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;