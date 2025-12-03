
import React from 'react';
import { Property, SiteSettings, User } from '../types';
import ImageSlider from './ImageSlider';
import ContactForm from './ContactForm';
import Photo360Viewer from './Photo360Viewer';

// --- Ícones ---
const BedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16v10H4zM7 12v-2a1 1 0 011-1h8a1 1 0 011 1v2" />
  </svg>
);
const BathIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 3h10v2H7V3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 8H5v9h14V8z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 17v-4a2 2 0 012-2h0a2 2 0 012 2v4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 19h14" />
    </svg>
);
const AreaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
  </svg>
);
const GarageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <g strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
      <path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" />
    </g>
  </svg>
);
const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-section-title" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);
const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const FeatureItem: React.FC<{ label: string }> = ({ label }) => (
    <div className="flex items-center space-x-2 bg-slate-800 p-2 rounded-md border border-slate-700">
        <CheckIcon />
        <span className="text-sm text-body">{label}</span>
    </div>
);

interface PropertyDetailProps {
  property: Property;
  onGoBack: () => void;
  users: User[];
  settings: SiteSettings;
}

const Section: React.FC<{title: string, children: React.ReactNode, className?: string}> = ({title, children, className=""}) => (
    <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-2xl shadow-black/20 p-6 ${className}`}>
        <h2 className="text-xl font-semibold text-section-title border-b border-slate-700 pb-3 mb-4">{title}</h2>
        {children}
    </div>
);


const PropertyDetail: React.FC<PropertyDetailProps> = ({ property, onGoBack, users, settings }) => {
  const fullAddress = `${property.address}, ${property.neighborhood}, ${property.city} - ${property.state} - CEP: ${property.zipCode}`;
  
  const formatCurrency = (value?: number) => {
    if (value === undefined || value === null) return 'N/A';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }

  const features = [
    { label: 'Piscina', value: property.hasPool },
    { label: 'Churrasqueira', value: property.hasBarbecueGrill },
    { label: 'Lareira', value: property.hasFireplace },
    { label: 'Sacada', value: property.hasBalcony },
    { label: 'Quintal', value: property.hasYard },
    { label: 'Mobiliado', value: property.isFurnished },
  ].filter(f => f.value);

  const contactUser = users.find(u => u.id === property.userId);
  const contactPhoneNumber = contactUser?.phone || '5541996013031'; // Fallback

  return (
    <main className="container mx-auto p-4 lg:p-8 animate-fade-in-up">
      <div className="mb-6">
        <button 
            onClick={onGoBack}
            className="flex items-center text-sm font-medium text-section-title hover:opacity-80 transition-colors"
        >
            <ArrowLeftIcon />
            Voltar para a lista de imóveis
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-2xl shadow-black/20 p-6">
            <p className="text-sm font-semibold text-section-title">{property.propertyType} para {property.type}</p>
            <h1 className="text-3xl font-bold text-page-title mt-1">{property.name}</h1>
            <p className="text-muted mt-2">{property.neighborhood}, {property.city} - {property.state}</p>
          </div>
          
          <div className="rounded-lg shadow-2xl shadow-black/20 overflow-hidden h-[40vh] md:h-[50vh] lg:h-[60vh] bg-slate-900 border border-slate-700">
            <ImageSlider urls={property.photoUrls} />
          </div>

          <Section title="Descrição">
              <p className="text-body leading-relaxed whitespace-pre-wrap">{property.description}</p>
          </Section>

          {features.length > 0 && (
              <Section title="Características">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {features.map(f => <FeatureItem key={f.label} label={f.label} />)}
                  </div>
              </Section>
          )}

           <Section title="Detalhes Técnicos">
               <ul className="space-y-3 text-sm text-body">
                  <li className="flex justify-between items-center border-b border-slate-700 pb-2"><span>Situação:</span> <span className="font-medium text-page-title">{property.status}</span></li>
                  {property.yearBuilt && <li className="flex justify-between items-center border-b border-slate-700 pb-2"><span>Ano da Construção:</span> <span className="font-medium text-page-title">{property.yearBuilt}</span></li>}
                  <li className="flex justify-between items-center border-b border-slate-700 pb-2"><span>Área Privativa:</span> <span className="font-medium text-page-title">{property.privateArea} m²</span></li>
                   <li className="flex justify-between items-center"><span>Área Total:</span> <span className="font-medium text-page-title">{property.totalArea} m²</span></li>
               </ul>
          </Section>
          
          {property.photo360Url && (
            <Section title="Tour Virtual 360°">
              <div className="rounded-lg overflow-hidden mt-4 border border-slate-700">
                <Photo360Viewer url={property.photo360Url} />
              </div>
            </Section>
          )}

          {property.showVideo && property.videoEmbedCode && (
            <Section title="Vídeo do Imóvel">
                <div 
                    className="relative w-full overflow-hidden mt-4 border border-slate-700 rounded-lg shadow-inner"
                    style={{ paddingBottom: '56.25%' }} // Aspect ratio 16:9
                >
                    <div 
                        className="absolute top-0 left-0 w-full h-full"
                        dangerouslySetInnerHTML={{ 
                            __html: property.videoEmbedCode
                                .replace(/width="[^"]*"/, 'width="100%"')
                                .replace(/height="[^"]*"/, 'height="100%"') 
                        }} 
                    />
                </div>
            </Section>
          )}

          <Section title="Localização">
               <p className="text-muted mt-4">{fullAddress}</p>
               {property.mapEmbedCode ? (
                <div 
                    className="mt-4 rounded-lg overflow-hidden border border-slate-700 shadow-inner"
                    dangerouslySetInnerHTML={{ __html: property.mapEmbedCode.replace(/width="[^"]*"/, 'width="100%"').replace(/height="[^"]*"/, 'height="450"') }}
                />
              ) : (
                <div className="mt-4 p-4 rounded-lg bg-slate-700/50 text-muted text-sm text-center">
                    <p>Mapa de localização não disponível para este imóvel.</p>
                </div>
              )}
          </Section>
        </div>

        <div className="relative">
            <div className="lg:sticky top-24 space-y-8">
                <Section title="Visão Geral">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 text-body">
                                <BedIcon className="w-6 h-6 text-section-title/70" />
                                <span>Quartos</span>
                            </div>
                            <span className="font-medium text-page-title">{property.bedrooms}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 text-body">
                                <BathIcon className="w-6 h-6 text-section-title/70" />
                                <span>Banheiros</span>
                            </div>
                            <span className="font-medium text-page-title">{property.bathrooms}</span>
                        </div>
                        <div className="flex items-center justify-between">
                             <div className="flex items-center space-x-3 text-body">
                                <GarageIcon className="w-6 h-6 text-section-title/70" />
                                <span>Vagas na Garagem</span>
                            </div>
                            <span className="font-medium text-page-title">{property.garageSpots}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 text-body">
                                <AreaIcon className="w-6 h-6 text-section-title/70" />
                                <span>Área Privativa</span>
                            </div>
                            <span className="font-medium text-page-title">{property.privateArea} m²</span>
                        </div>
                    </div>
                </Section>

                <Section title="Valores">
                    <div className="space-y-3">
                        <div className="flex justify-between items-baseline"><span className="text-muted text-sm">Valor do Imóvel</span><span className="font-bold text-section-title text-2xl">{formatCurrency(property.price)}</span></div>
                        <div className="flex justify-between text-sm pt-2 border-t border-slate-700"><span className="text-muted">Condomínio</span><span className="font-bold text-page-title">{formatCurrency(property.condoFee)}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-muted">IPTU</span><span className="font-bold text-page-title">{formatCurrency(property.iptu)}</span></div>
                    </div>
                </Section>

                {property.realtorName && (
                    <Section title="Corretor Responsável">
                        <div className="flex items-center space-x-3">
                           <UserIcon className="w-6 h-6 text-white" />
                           <span className="font-medium text-page-title">{property.realtorName}</span>
                        </div>
                    </Section>
                )}

                <ContactForm property={property} contactPhoneNumber={contactPhoneNumber} settings={settings} />
            </div>
        </div>
      </div>
    </main>
  );
};

export default PropertyDetail;