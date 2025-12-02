import React from 'react';
import { Property } from '../types';
import ImageSlider from './ImageSlider';
import ContactForm from './ContactForm';
import Photo360Viewer from './Photo360Viewer'; // Novo

// --- Ícones ---
const BedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16v10H4zM7 12v-2a1 1 0 011-1h8a1 1 0 011 1v2" />
  </svg>
);
const BathIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
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
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor" {...props}>
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


// --- Componente de Item de Característica ---
const FeatureItem: React.FC<{ label: string }> = ({ label }) => (
    <div className="flex items-center space-x-2 bg-slate-100 p-2 rounded-md">
        <CheckIcon />
        <span className="text-sm text-slate-700">{label}</span>
    </div>
);


interface PropertyDetailProps {
  property: Property;
  onGoBack: () => void;
  contactPhoneNumber: string;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property, onGoBack, contactPhoneNumber }) => {
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

  return (
    <main className="container mx-auto p-4 lg:p-8">
      {/* Botão Voltar */}
      <div className="mb-6">
        <button 
            onClick={onGoBack}
            className="flex items-center text-sm font-medium text-sky-600 hover:text-sky-800 transition-colors"
        >
            <ArrowLeftIcon />
            Voltar para a lista de imóveis
        </button>
      </div>
      
      {/* Layout Principal com Galeria e Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Coluna Principal (Esquerda) com Galeria e Detalhes */}
        <div className="lg:col-span-2 space-y-8">
          {/* Cabeçalho com Título */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-sm font-semibold text-sky-700">{property.propertyType} para {property.type}</p>
            <h1 className="text-3xl font-bold text-slate-800 mt-1">{property.name}</h1>
            <p className="text-slate-500 mt-2">{property.neighborhood}, {property.city} - {property.state}</p>
          </div>
          
          {/* Galeria de Fotos */}
          <div className="rounded-lg shadow-lg overflow-hidden h-[40vh] md:h-[50vh] lg:h-[60vh] bg-slate-200">
            <ImageSlider urls={property.photoUrls} />
          </div>

          {/* Descrição */}
          <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-slate-700 border-b pb-2 mb-4">Descrição</h2>
              <p className="text-slate-600 whitespace-pre-wrap">{property.description}</p>
          </div>

          {/* Características */}
          {features.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-slate-700 border-b pb-2 mb-4">Características</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {features.map(f => <FeatureItem key={f.label} label={f.label} />)}
                  </div>
              </div>
          )}

          {/* Detalhes Técnicos */}
           <div className="bg-white rounded-lg shadow-lg p-6">
               <h2 className="text-xl font-semibold text-slate-700 border-b pb-2 mb-4">Detalhes Técnicos</h2>
               <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex justify-between"><span>Situação:</span> <span className="font-medium text-slate-800">{property.status}</span></li>
                  {property.yearBuilt && <li className="flex justify-between"><span>Ano da Construção:</span> <span className="font-medium text-slate-800">{property.yearBuilt}</span></li>}
                  <li className="flex justify-between"><span>Área Privativa:</span> <span className="font-medium text-slate-800">{property.privateArea} m²</span></li>
                   <li className="flex justify-between"><span>Área Total:</span> <span className="font-medium text-slate-800">{property.totalArea} m²</span></li>
               </ul>
          </div>
          
          {/* Tour Virtual 360° */}
          {property.photo360Url && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-slate-700 border-b pb-2 mb-4">Tour Virtual 360°</h2>
              <div className="rounded-lg overflow-hidden mt-4">
                <Photo360Viewer url={property.photo360Url} />
              </div>
            </div>
          )}

          {/* Localização */}
          <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-slate-700 border-b pb-2">Localização</h2>
               <p className="text-slate-500 mt-4">{fullAddress}</p>
               {property.mapEmbedCode ? (
                <div 
                    className="mt-4 rounded-lg overflow-hidden border border-slate-200 shadow-inner"
                    dangerouslySetInnerHTML={{ __html: property.mapEmbedCode.replace(/width="[^"]*"/, 'width="100%"').replace(/height="[^"]*"/, 'height="450"') }}
                />
              ) : (
                <div className="mt-4 p-4 rounded-lg bg-slate-100 text-slate-500 text-sm text-center">
                    <p>Mapa de localização não disponível para este imóvel.</p>
                </div>
              )}
          </div>
        </div>

        {/* Coluna da Barra Lateral (Direita) */}
        <div className="relative">
            <div className="lg:sticky top-24 space-y-8">
                {/* Visão Geral */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold text-slate-700 mb-4">Visão Geral</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 text-slate-600">
                                <BedIcon className="w-6 h-6 text-slate-400" />
                                <span>Quartos</span>
                            </div>
                            <span className="font-medium text-slate-800">{property.bedrooms}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 text-slate-600">
                                <BathIcon className="w-6 h-6 text-slate-400" />
                                <span>Banheiros</span>
                            </div>
                            <span className="font-medium text-slate-800">{property.bathrooms}</span>
                        </div>
                        <div className="flex items-center justify-between">
                             <div className="flex items-center space-x-3 text-slate-600">
                                <GarageIcon className="w-6 h-6 text-slate-400" />
                                <span>Vagas na Garagem</span>
                            </div>
                            <span className="font-medium text-slate-800">{property.garageSpots}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 text-slate-600">
                                <AreaIcon className="w-6 h-6 text-slate-400" />
                                <span>Área Privativa</span>
                            </div>
                            <span className="font-medium text-slate-800">{property.privateArea} m²</span>
                        </div>
                    </div>
                </div>

                {/* Valores */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold text-slate-700 border-b pb-2 mb-4">Valores</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm"><span className="text-slate-500">Valor do Imóvel</span><span className="font-bold text-sky-600 text-lg">{formatCurrency(property.price)}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-slate-500">Condomínio</span><span className="font-bold text-slate-800">{formatCurrency(property.condoFee)}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-slate-500">IPTU</span><span className="font-bold text-slate-800">{formatCurrency(property.iptu)}</span></div>
                    </div>
                </div>

                 {/* Corretor Responsável */}
                {property.realtorName && (
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold text-slate-700 mb-4">Corretor Responsável</h2>
                        <div className="flex items-center space-x-3">
                           <UserIcon className="w-6 h-6 text-slate-400" />
                           <span className="font-medium text-slate-800">{property.realtorName}</span>
                        </div>
                    </div>
                )}


                {/* Formulário de Contato */}
                <ContactForm property={property} contactPhoneNumber={contactPhoneNumber} />
            </div>
        </div>
      </div>
    </main>
  );
};

export default PropertyDetail;