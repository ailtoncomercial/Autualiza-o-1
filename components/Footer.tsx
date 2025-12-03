
import React from 'react';
import { SiteSettings } from '../types';

interface FooterProps {
    settings: SiteSettings;
    onNavigateToAbout: () => void;
    onNavigateToContact: () => void;
    onNavigateToLocation: () => void;
}

const Footer: React.FC<FooterProps> = ({ settings, onNavigateToAbout, onNavigateToContact, onNavigateToLocation }) => {
    return (
        <footer 
            className="text-muted mt-16 border-t border-slate-800"
            style={{ backgroundColor: settings.footerBackgroundColor }}
        >
            <div className="container mx-auto px-4 py-8 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
                    <div className="md:col-span-2">
                        <h3 className="text-lg font-bold text-page-title mb-2">DIGIFOX Imóveis</h3>
                        <p className="text-sm">{settings.footerDescription}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-page-title mb-2">Institucional</h3>
                        <ul className="space-y-2">
                           <li>
                             <button onClick={onNavigateToAbout} className="text-sm text-muted hover:text-section-title transition-colors">
                                Quem Somos
                             </button>
                           </li>
                           <li>
                             <button onClick={onNavigateToContact} className="text-sm text-muted hover:text-section-title transition-colors">
                                Contato
                             </button>
                           </li>
                           <li>
                             <button onClick={onNavigateToLocation} className="text-sm text-muted hover:text-section-title transition-colors">
                                Localização
                             </button>
                           </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-page-title mb-2">Siga-nos</h3>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <a href={settings.footerFacebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-section-title transition-colors">Facebook</a>
                            <a href={settings.footerInstagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-section-title transition-colors">Instagram</a>
                            <a href={settings.footerLinkedInUrl} target="_blank" rel="noopener noreferrer" className="hover:text-section-title transition-colors">LinkedIn</a>
                        </div>
                    </div>
                </div>
                 <div className="mt-8 border-t border-slate-700 pt-6 text-center text-sm">
                     <p><b>Contato:</b> {settings.footerContactEmail} | {settings.footerContactPhone}</p>
                    <p className="mt-2">&copy; {new Date().getFullYear()} {settings.footerCopyright}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;