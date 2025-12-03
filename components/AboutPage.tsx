import React from 'react';
import { SiteSettings } from '../types';

interface AboutPageProps {
  onGoBackToHome: () => void;
  settings: SiteSettings;
}

const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const AboutPage: React.FC<AboutPageProps> = ({ onGoBackToHome, settings }) => {
  const values = settings.aboutPageValues.split('\n').filter(line => line.trim() !== '');

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
        <h1 className="text-4xl font-bold text-page-title text-center mb-8">Quem Somos</h1>
        
        {settings.aboutPageImageUrl && (
          <div className="mb-10 rounded-lg overflow-hidden shadow-lg">
              <img 
                  src={settings.aboutPageImageUrl} 
                  alt="Escritório da imobiliária DIGIFOX"
                  className="w-full h-64 object-cover"
              />
          </div>
        )}

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-section-title mb-4 border-b border-slate-700 pb-2">Nossa História</h2>
          <p className="text-body leading-relaxed whitespace-pre-wrap">
            {settings.aboutPageHistory}
          </p>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-section-title mb-4 border-b border-slate-700 pb-2">Nossa Missão</h2>
          <p className="text-body leading-relaxed whitespace-pre-wrap">
            {settings.aboutPageMission}
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-section-title mb-4 border-b border-slate-700 pb-2">Nossos Valores</h2>
          <ul className="list-disc list-inside text-body space-y-2">
            {values.map((value, index) => {
                const parts = value.split(':');
                const strongText = parts[0];
                const normalText = parts.slice(1).join(':');
                return (
                     <li key={index}>
                        {strongText && <strong className="text-page-title">{strongText}:</strong>}
                        {normalText}
                    </li>
                )
            })}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default AboutPage;