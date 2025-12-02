import React from 'react';
import { Property } from '../types';
import ImageSlider from './ImageSlider';

interface PropertyCardProps {
  property: Property;
  onViewProperty: (propertyId: string) => void;
}

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


const PropertyCard: React.FC<PropertyCardProps> = ({ property, onViewProperty }) => {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <div 
        id={`property-${property.id}`} 
        className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 transition-transform duration-300 group"
    >
        <div className="relative">
            <div className="h-56">
                <ImageSlider urls={property.photoUrls} />
            </div>
            <div className={`absolute top-2 left-2 px-2.5 py-1 text-xs font-semibold text-white rounded-full ${property.type === 'venda' ? 'bg-sky-600' : 'bg-green-600'}`}>
                {property.type === 'venda' ? 'Venda' : 'Aluguel'}
            </div>
        </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <p className="text-sm font-semibold text-sky-700">{property.propertyType}</p>
        <h3 className="text-lg font-bold text-slate-800 truncate mt-1">{property.name}</h3>
        <p className="text-sm text-slate-500 mt-1 truncate">{property.neighborhood}, {property.city} - {property.state}</p>

        <div className="my-4 py-3 border-t border-b border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm text-slate-600">
            <div className="flex items-center space-x-2">
                <BedIcon className="w-5 h-5 text-slate-400" />
                <span>{property.bedrooms} {property.bedrooms > 1 ? 'Quartos' : 'Quarto'}</span>
            </div>
             <div className="flex items-center space-x-2">
                <BathIcon className="w-5 h-5 text-slate-400" />
                <span>{property.bathrooms} {property.bathrooms > 1 ? 'Banh.' : 'Banh.'}</span>
            </div>
             <div className="flex items-center space-x-2">
                <AreaIcon className="w-5 h-5 text-slate-400" />
                {/* FIX: Use `privateArea` instead of `area` which does not exist on the Property type. */}
                <span>{property.privateArea} m²</span>
            </div>
             <div className="flex items-center space-x-2">
                <GarageIcon className="w-5 h-5 text-slate-400" />
                <span>{property.garageSpots} {property.garageSpots > 1 ? 'Vagas' : 'Vaga'}</span>
            </div>
        </div>
        
        <div className="mt-auto flex items-center justify-between">
            <div>
                <p className="text-xs text-slate-500">Valor</p>
                <p className="text-xl font-bold text-slate-800">{formattedPrice}</p>
            </div>
            <button
                onClick={() => onViewProperty(property.id)}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
                aria-label={`Ver mais detalhes sobre ${property.name}`}
            >
                Veja Mais
            </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;