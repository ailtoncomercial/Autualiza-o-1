import React from 'react';
import { Property, Filters } from '../types';
import PropertyCard from './PropertyCard';

interface SearchResultsPageProps {
  properties: Property[];
  onViewProperty: (propertyId: string) => void;
  initialFilters: Filters;
  onFilterChange: (filterName: keyof Filters, value: string | number) => void;
}

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ properties, onViewProperty, initialFilters, onFilterChange }) => {
  const inputStyles = "mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-sm shadow-sm placeholder-muted text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500";
  
  return (
    <main className="container mx-auto p-4 lg:p-8 animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-page-title mb-2">Resultados da Busca</h1>
        <p className="text-muted">
          {properties.length} {properties.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-2xl shadow-black/20 p-4">
             <h2 className="text-xl font-semibold text-page-title mb-4">Refinar Busca</h2>
             <div className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-body">Tipo</label>
                    <select name="type" value={initialFilters.type} onChange={(e) => onFilterChange('type', e.target.value)} className={inputStyles}>
                        <option value="todos">Todos</option>
                        <option value="venda">Venda</option>
                        <option value="aluguel">Aluguel</option>
                    </select>
                </div>
                 <div>
                    <label className="text-sm font-medium text-body">Categoria</label>
                    <select name="propertyType" value={initialFilters.propertyType} onChange={(e) => onFilterChange('propertyType', e.target.value)} className={inputStyles}>
                        <option value="">Todas</option>
                        <option>Apartamento</option>
                        <option>Casa</option>
                        <option>Cobertura</option>
                        <option>Terreno</option>
                        <option>Comercial</option>
                    </select>
                </div>
                 <div>
                    <label className="text-sm font-medium text-body">Cidade</label>
                    <input type="text" name="city" placeholder="Digite a cidade" value={initialFilters.city} onChange={(e) => onFilterChange('city', e.target.value)} className={inputStyles}/>
                </div>
                 <div>
                    <label className="text-sm font-medium text-body">Quartos (mínimo)</label>
                    <input type="number" name="bedrooms" min="0" value={initialFilters.bedrooms} onChange={(e) => onFilterChange('bedrooms', Number(e.target.value))} className={inputStyles}/>
                </div>
             </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {properties.map(property => (
                <PropertyCard 
                  key={property.id} 
                  property={property} 
                  onViewProperty={onViewProperty}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-slate-800/50 border border-slate-700 rounded-lg shadow-lg">
              <p className="text-lg text-muted">Nenhum imóvel encontrado.</p>
              <p className="text-sm mt-2 text-muted">Tente ajustar seus filtros de busca.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default SearchResultsPage;