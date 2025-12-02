import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Property } from '../types';

interface PropertyFormProps {
  onAddProperty: (property: Omit<Property, 'id'>) => void;
  editingProperty: Property | null;
  onUpdateProperty: (property: Property) => void;
  onCancelEdit: () => void;
}

const PhotoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
  </svg>
);


const PropertyForm: React.FC<PropertyFormProps> = ({ onAddProperty, editingProperty, onUpdateProperty, onCancelEdit }) => {
  // FIX: Added condoFee, iptu, and yearBuilt to Omit to prevent a type intersection issue (e.g., `string & number` becomes `never`).
  const initialState: Omit<Property, 'id' | 'photoUrls' | 'price' | 'bedrooms' | 'bathrooms' | 'garageSpots' | 'privateArea' | 'totalArea' | 'condoFee' | 'iptu' | 'yearBuilt'> & {
    price: string, bedrooms: string, bathrooms: string, garageSpots: string, privateArea: string, totalArea: string, condoFee: string, iptu: string, yearBuilt: string
  } = {
    name: '',
    realtorName: '',
    address: '',
    city: '',
    state: '',
    neighborhood: '',
    zipCode: '',
    price: '',
    condoFee: '',
    iptu: '',
    photo360Url: '',
    mapEmbedCode: '',
    description: '',
    type: 'venda',
    propertyType: 'Apartamento',
    bedrooms: '',
    bathrooms: '',
    garageSpots: '',
    privateArea: '',
    totalArea: '',
    yearBuilt: '',
    status: 'Usado',
    featured: false,
    hasPool: false,
    hasBarbecueGrill: false,
    hasFireplace: false,
    hasBalcony: false,
    hasYard: false,
    isFurnished: false,
  };

  const [formState, setFormState] = useState(initialState);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const MAX_PHOTOS = 10;

  const resetForm = () => {
    setFormState(initialState);
    setPhotoPreviews([]);
    setError('');
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if(fileInput) fileInput.value = '';
  };

  useEffect(() => {
    if (editingProperty) {
      setFormState({
        name: editingProperty.name,
        realtorName: editingProperty.realtorName || '',
        address: editingProperty.address,
        city: editingProperty.city,
        state: editingProperty.state,
        neighborhood: editingProperty.neighborhood,
        zipCode: editingProperty.zipCode,
        price: editingProperty.price.toString(),
        condoFee: editingProperty.condoFee?.toString() || '',
        iptu: editingProperty.iptu?.toString() || '',
        photo360Url: editingProperty.photo360Url || '',
        mapEmbedCode: editingProperty.mapEmbedCode || '',
        description: editingProperty.description,
        type: editingProperty.type,
        propertyType: editingProperty.propertyType,
        bedrooms: editingProperty.bedrooms.toString(),
        bathrooms: editingProperty.bathrooms.toString(),
        garageSpots: editingProperty.garageSpots.toString(),
        privateArea: editingProperty.privateArea.toString(),
        totalArea: editingProperty.totalArea.toString(),
        yearBuilt: editingProperty.yearBuilt?.toString() || '',
        status: editingProperty.status,
        featured: editingProperty.featured,
        hasPool: editingProperty.hasPool,
        hasBarbecueGrill: editingProperty.hasBarbecueGrill,
        hasFireplace: editingProperty.hasFireplace,
        hasBalcony: editingProperty.hasBalcony,
        hasYard: editingProperty.hasYard,
        isFurnished: editingProperty.isFurnished,
      });
      setPhotoPreviews(editingProperty.photoUrls);
      setError('');
    } else {
      resetForm();
    }
  }, [editingProperty]);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
     if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setFormState(prev => ({ ...prev, [name]: checked }));
    } else {
        setFormState(prev => ({ ...prev, [name]: value }));
    }
  };


  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (photoPreviews.length + files.length > MAX_PHOTOS) {
      setError(`Você pode carregar no máximo ${MAX_PHOTOS} fotos.`);
      return;
    }
    setError('');

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
         setPhotoPreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };
  
  const handleRemovePhoto = (indexToRemove: number) => {
    setPhotoPreviews(prev => prev.filter((_, index) => index !== indexToRemove));
  };


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { name, address, city, neighborhood, price, description, zipCode, state } = formState;

    if (!name || !address || !city || !state || !neighborhood || !zipCode || !price || !description || photoPreviews.length === 0) {
        setError('Por favor, preencha todos os campos obrigatórios e adicione pelo menos uma foto.');
        return;
    }
    
    const propertyData: Omit<Property, 'id'> = {
      name: formState.name,
      realtorName: formState.realtorName,
      address: formState.address,
      city: formState.city,
      state: formState.state,
      neighborhood: formState.neighborhood,
      zipCode: formState.zipCode,
      price: parseFloat(formState.price),
      condoFee: formState.condoFee ? parseFloat(formState.condoFee) : undefined,
      iptu: formState.iptu ? parseFloat(formState.iptu) : undefined,
      photo360Url: formState.photo360Url || undefined,
      mapEmbedCode: formState.mapEmbedCode || undefined,
      description: formState.description,
      type: formState.type,
      propertyType: formState.propertyType,
      bedrooms: parseInt(formState.bedrooms, 10) || 0,
      bathrooms: parseInt(formState.bathrooms, 10) || 0,
      garageSpots: parseInt(formState.garageSpots, 10) || 0,
      privateArea: parseInt(formState.privateArea, 10) || 0,
      totalArea: parseInt(formState.totalArea, 10) || 0,
      yearBuilt: formState.yearBuilt ? parseInt(formState.yearBuilt, 10) : undefined,
      status: formState.status,
      featured: formState.featured,
      photoUrls: photoPreviews,
      hasPool: formState.hasPool,
      hasBarbecueGrill: formState.hasBarbecueGrill,
      hasFireplace: formState.hasFireplace,
      hasBalcony: formState.hasBalcony,
      hasYard: formState.hasYard,
      isFurnished: formState.isFurnished,
    };

    if (editingProperty) {
      onUpdateProperty({
        ...editingProperty,
        ...propertyData,
      });
    } else {
      onAddProperty(propertyData);
    }
  };

  const renderFieldset = (legend: string, children: React.ReactNode) => (
    <fieldset className="border border-slate-300 p-4 rounded-md">
        <legend className="text-sm font-medium text-slate-600 px-2">{legend}</legend>
        <div className="space-y-4">
            {children}
        </div>
    </fieldset>
  );
  
  const featureTranslations: { [key: string]: string } = {
    hasPool: 'Piscina',
    hasBarbecueGrill: 'Churrasqueira',
    hasFireplace: 'Lareira',
    hasBalcony: 'Sacada',
    hasYard: 'Quintal',
    isFurnished: 'Mobiliado',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-5 text-center text-slate-700">
        {editingProperty ? 'Editar Imóvel' : 'Cadastrar Novo Imóvel'}
      </h2>
      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {renderFieldset('Informações Principais', <>
            <div>
                 <label htmlFor="name" className="block text-sm font-medium text-slate-600">Nome do Imóvel</label>
                <input type="text" name="name" id="name" value={formState.name} onChange={handleChange} placeholder="Ex: Casa com 3 quartos em..." className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
            </div>
             <div>
                 <label htmlFor="realtorName" className="block text-sm font-medium text-slate-600">Corretor Responsável (Opcional)</label>
                <input type="text" name="realtorName" id="realtorName" value={formState.realtorName || ''} onChange={handleChange} placeholder="Nome do corretor" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                 <div>
                    <label htmlFor="city" className="block text-sm font-medium text-slate-600">Cidade</label>
                    <input type="text" name="city" id="city" value={formState.city} onChange={handleChange} placeholder="Ex: Curitiba" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                </div>
                <div>
                    <label htmlFor="state" className="block text-sm font-medium text-slate-600">Estado</label>
                    <input type="text" name="state" id="state" value={formState.state} onChange={handleChange} placeholder="Ex: PR" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                </div>
                 <div>
                    <label htmlFor="neighborhood" className="block text-sm font-medium text-slate-600">Bairro</label>
                    <input type="text" name="neighborhood" id="neighborhood" value={formState.neighborhood} onChange={handleChange} placeholder="Ex: Centro" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                </div>
            </div>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-slate-600">Endereço</label>
                    <input type="text" name="address" id="address" value={formState.address} onChange={handleChange} placeholder="Rua, N°" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                </div>
                 <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-slate-600">CEP</label>
                    <input type="text" name="zipCode" id="zipCode" value={formState.zipCode} onChange={handleChange} placeholder="00000-000" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                </div>
            </div>
            <div>
                 <label htmlFor="description" className="block text-sm font-medium text-slate-600">Descrição</label>
                <textarea name="description" id="description" value={formState.description} onChange={handleChange} rows={4} placeholder="Descreva os detalhes do imóvel..." className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
            </div>
        </>)}

        {renderFieldset('Valores e Taxas (R$)', <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                 <div>
                    <label htmlFor="price" className="block text-sm font-medium text-slate-600">Valor do Imóvel</label>
                    <input type="number" name="price" id="price" value={formState.price} onChange={handleChange} placeholder="Ex: 550000" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                </div>
                 <div>
                    <label htmlFor="condoFee" className="block text-sm font-medium text-slate-600">Condomínio (Opcional)</label>
                    <input type="number" name="condoFee" id="condoFee" value={formState.condoFee} onChange={handleChange} placeholder="Ex: 450" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                </div>
                 <div>
                    <label htmlFor="iptu" className="block text-sm font-medium text-slate-600">IPTU (Opcional)</label>
                    <input type="number" name="iptu" id="iptu" value={formState.iptu} onChange={handleChange} placeholder="Ex: 1200" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                </div>
            </div>
        </>)}

        {renderFieldset('Detalhes do Imóvel', <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-slate-600">Tipo</label>
                    <select name="type" id="type" value={formState.type} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
                        <option value="venda">Venda</option>
                        <option value="aluguel">Aluguel</option>
                    </select>
                </div>
                 <div>
                    <label htmlFor="propertyType" className="block text-sm font-medium text-slate-600">Categoria</label>
                    <select name="propertyType" id="propertyType" value={formState.propertyType} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
                        <option>Apartamento</option>
                        <option>Casa</option>
                        <option>Cobertura</option>
                        <option>Terreno</option>
                        <option>Comercial</option>
                    </select>
                </div>
                 <div>
                    <label htmlFor="status" className="block text-sm font-medium text-slate-600">Situação</label>
                    <select name="status" id="status" value={formState.status} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
                        <option>Usado</option>
                        <option>Novo</option>
                        <option>Lançamento</option>
                    </select>
                </div>
                 <div>
                    <label htmlFor="yearBuilt" className="block text-sm font-medium text-slate-600">Ano (Opcional)</label>
                    <input type="number" name="yearBuilt" id="yearBuilt" value={formState.yearBuilt} onChange={handleChange} placeholder="Ex: 2018" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                    <label htmlFor="bedrooms" className="block text-sm font-medium text-slate-600">Quartos</label>
                    <input type="number" name="bedrooms" id="bedrooms" value={formState.bedrooms} onChange={handleChange} placeholder="Ex: 3" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                </div>
                 <div>
                    <label htmlFor="bathrooms" className="block text-sm font-medium text-slate-600">Banheiros</label>
                    <input type="number" name="bathrooms" id="bathrooms" value={formState.bathrooms} onChange={handleChange} placeholder="Ex: 2" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                </div>
                 <div>
                    <label htmlFor="garageSpots" className="block text-sm font-medium text-slate-600">Vagas</label>
                    <input type="number" name="garageSpots" id="garageSpots" value={formState.garageSpots} onChange={handleChange} placeholder="Ex: 2" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                </div>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="privateArea" className="block text-sm font-medium text-slate-600">Área Privativa (m²)</label>
                    <input type="number" name="privateArea" id="privateArea" value={formState.privateArea} onChange={handleChange} placeholder="Ex: 120" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                </div>
                 <div>
                    <label htmlFor="totalArea" className="block text-sm font-medium text-slate-600">Área Total (m²)</label>
                    <input type="number" name="totalArea" id="totalArea" value={formState.totalArea} onChange={handleChange} placeholder="Ex: 200" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                </div>
            </div>
        </>)}
        
        {renderFieldset('Características Adicionais', <>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.keys(featureTranslations)
                    .map(key => (
                        <label htmlFor={key} className="flex items-center" key={key}>
                            <input type="checkbox" id={key} name={key} checked={formState[key as keyof typeof formState] as boolean} onChange={handleChange} className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
                            <span className="ml-2 text-sm text-slate-600">{featureTranslations[key]}</span>
                        </label>
                    ))
                }
            </div>
        </>)}

        {renderFieldset('Fotos e Mídia', <>
             {photoPreviews.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {photoPreviews.map((preview, index) => (
                    <div key={index} className="relative">
                    <img src={preview} alt={`Pré-visualização ${index + 1}`} className="h-20 w-full object-cover rounded-md" />
                    <button type="button" onClick={() => handleRemovePhoto(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600" aria-label="Remover foto"><CloseIcon /></button>
                    </div>
                ))}
                </div>
            )}
            <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                <PhotoIcon />
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-sky-600 hover:text-sky-500">
                    <span>Adicionar fotos ({photoPreviews.length}/{MAX_PHOTOS})</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" multiple onChange={handlePhotoChange} disabled={photoPreviews.length >= MAX_PHOTOS}/>
                </label>
                <p className="text-xs text-slate-500">PNG, JPG até 10MB</p>
                </div>
            </div>
             <div>
                 <label htmlFor="photo360Url" className="block text-sm font-medium text-slate-600">Link do Tour Virtual 360° (Opcional)</label>
                <input type="url" name="photo360Url" id="photo360Url" value={formState.photo360Url || ''} onChange={handleChange} placeholder="Cole o link de compartilhamento do seu tour virtual" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
            </div>
            <div>
              <label htmlFor="mapEmbedCode" className="block text-sm font-medium text-slate-600">Código de Incorporação do Mapa (Opcional)</label>
              <textarea name="mapEmbedCode" id="mapEmbedCode" value={formState.mapEmbedCode || ''} onChange={handleChange} rows={4} placeholder="Cole o código <iframe> do Google Maps aqui." className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
            </div>
        </>)}

        <div>
          <label htmlFor="featured" className="flex items-center">
            <input type="checkbox" id="featured" name="featured" checked={formState.featured} onChange={handleChange} className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
            <span className="ml-2 text-sm text-slate-600">Destaque na Página Inicial</span>
          </label>
        </div>

        <div className="flex flex-col space-y-2 pt-2">
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700">{editingProperty ? 'Salvar Alterações' : 'Adicionar Imóvel'}</button>
            <button type="button" onClick={onCancelEdit} className="w-full flex justify-center py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;