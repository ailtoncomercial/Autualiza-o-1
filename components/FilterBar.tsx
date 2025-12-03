import React, { ChangeEvent } from 'react';
import { Filters } from '../types';

interface FilterBarProps {
    filters: Filters;
    onFilterChange: (filterName: keyof Filters, value: string | number) => void;
    onSearch?: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange, onSearch }) => {

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        onFilterChange(name as keyof Filters, e.target.type === 'number' ? Number(value) : value);
    };

    const inputStyles = "w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-md text-sm shadow-sm placeholder-muted text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors";

    return (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-4 rounded-lg shadow-2xl shadow-black/30 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
                <div className="flex flex-col md:col-span-2 lg:col-span-1">
                    <label className="text-sm font-medium mb-1 text-left text-body">Localização</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                         <input
                            type="text"
                            name="city"
                            placeholder="Cidade"
                            value={filters.city}
                            onChange={handleInputChange}
                            className={inputStyles}
                        />
                         <input
                            type="text"
                            name="state"
                            placeholder="Estado"
                            value={filters.state}
                            onChange={handleInputChange}
                            className={inputStyles}
                        />
                        <input
                            type="text"
                            name="neighborhood"
                            placeholder="Bairro"
                            value={filters.neighborhood}
                            onChange={handleInputChange}
                            className={inputStyles}
                        />
                    </div>
                </div>
                
                <div className="flex flex-col md:col-span-2 lg:col-span-1">
                     <label className="text-sm font-medium mb-1 text-left text-body">Características</label>
                     <div className="grid grid-cols-2 gap-2">
                        <select name="propertyType" value={filters.propertyType} onChange={handleInputChange} className={inputStyles}>
                            <option value="">Categoria</option>
                            <option>Apartamento</option>
                            <option>Casa</option>
                            <option>Cobertura</option>
                            <option>Terreno</option>
                            <option>Comercial</option>
                        </select>
                         <select name="type" value={filters.type} onChange={handleInputChange} className={inputStyles}>
                            <option value="todos">Venda/Aluguel</option>
                            <option value="venda">Venda</option>
                            <option value="aluguel">Aluguel</option>
                        </select>
                    </div>
                </div>

                <div className="md:col-span-2 lg:col-span-1">
                    <button 
                        className="w-full font-bold py-2 px-4 rounded-md btn-primary"
                        onClick={onSearch}
                    >
                        Buscar Imóveis
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;