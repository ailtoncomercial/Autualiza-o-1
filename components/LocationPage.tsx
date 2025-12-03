import React from 'react';
import { SiteSettings } from '../types';

interface LocationPageProps {
  onGoBackToHome: () => void;
  settings: SiteSettings;
}

const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const LocationPage: React.FC<LocationPageProps> = ({ onGoBackToHome, settings }) => {
  const createSafeMapHtml = () => {
    if (!settings.mapEmbedCode || typeof settings.mapEmbedCode !== 'string') {
      return { __html: '' };
    }
    const sanitizedHtml = settings.mapEmbedCode
      .replace(/width="[^"]*"/, 'width="100%"')
      .replace(/height="[^"]*"/, 'height="450"');
    
    return { __html: sanitizedHtml };
  };

  return (
    <main className="container mx-auto p-4 lg:p-8 animate-fade-in-up">
      <div className="mb-6">
        <button 
            onClick={onGoBackToHome}
            className="flex items-center text-sm font-medium text-section-title hover:opacity-80 transition-colors"
        >
            <ArrowLeftIcon />
            Voltar para a Home
        </button>
      </div>
      
      <div className="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-2xl shadow-black/20 p-8 md:p-12">
        <h1 className="text-4xl font-bold text-page-title text-center mb-4">Nossa Localização</h1>
        <p className="text-lg text-muted text-center mb-8">
            Venha nos fazer uma visita!
        </p>

        <div className="text-center p-6 bg-slate-700/50 rounded-lg border border-slate-600">
            <h2 className="text-xl font-semibold text-page-title">Endereço</h2>
            <p className="text-body mt-2">{settings.companyAddress}</p>
        </div>
        
        <div className="mt-8 rounded-lg overflow-hidden shadow-md border border-slate-700">
           {settings.mapEmbedCode ? (
             <div 
                className="w-full"
                dangerouslySetInnerHTML={createSafeMapHtml()}
             />
           ) : (
             <div className="p-4 rounded-lg bg-yellow-900/50 border border-yellow-700/50 text-yellow-300 text-sm">
                <p className="font-bold">Mapa não configurado</p>
                <p>O administrador precisa adicionar o código de incorporação do mapa nas Configurações do Site.</p>
             </div>
           )}
        </div>
      </div>
    </main>
  );
};

export default LocationPage;