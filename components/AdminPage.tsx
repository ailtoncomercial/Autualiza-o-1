import React, { useState, useMemo } from 'react';
import { Property, User } from '../types';
import PropertyForm from './PropertyForm';

interface AdminPageProps {
    properties: Property[];
    currentUser: User | null;
    onAddProperty: (property: Omit<Property, 'id' | 'userId'>) => void;
    onUpdateProperty: (property: Property) => void;
    onDeleteProperty: (propertyId: string) => void;
    onToggleFeatured: (propertyId: string) => void;
    onGoBackToHome: () => void;
    onManageAdmins: () => void;
    onManageSite: () => void;
}

const StarIcon: React.FC<React.SVGProps<SVGSVGElement> & { filled?: boolean }> = ({ filled, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const EditIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
  </svg>
);

const DeleteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.124-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.077-2.09.921-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);

const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);


const AdminPage: React.FC<AdminPageProps> = ({ properties, currentUser, onAddProperty, onUpdateProperty, onDeleteProperty, onToggleFeatured, onGoBackToHome, onManageAdmins, onManageSite }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProperty, setEditingProperty] = useState<Property | null>(null);

    const propertiesToDisplay = useMemo(() => {
        if (!currentUser) return [];
        if (currentUser.role === 'Administrador') {
            return properties;
        }
        return properties.filter(p => p.userId === currentUser.id);
    }, [properties, currentUser]);

    const handleOpenModal = (property: Property | null = null) => {
        setEditingProperty(property);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingProperty(null);
        setIsModalOpen(false);
    };
    
    const handleAddSubmit = (property: Omit<Property, 'id' | 'userId'>) => {
        onAddProperty(property);
        handleCloseModal();
    };

    const handleUpdateSubmit = (property: Property) => {
        onUpdateProperty(property);
        handleCloseModal();
    };

    const confirmDelete = (propertyId: string) => {
        onDeleteProperty(propertyId);
    };

    return (
        <>
            <main className="container mx-auto p-4 lg:p-8">
                 <div className="flex justify-between items-center mb-8">
                    <button 
                        onClick={onGoBackToHome}
                        className="flex items-center text-sm font-medium text-sky-600 hover:text-sky-800 transition-colors"
                    >
                        <ArrowLeftIcon />
                        Voltar para a Home
                    </button>
                    {currentUser?.role === 'Administrador' && (
                        <div className="flex space-x-2">
                            <button 
                                onClick={onManageSite}
                                className="px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
                            >
                                Configurações do Site
                            </button>
                            <button 
                                onClick={onManageAdmins}
                                className="px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
                            >
                                Gerenciar Administradores
                            </button>
                        </div>
                    )}
                </div>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-slate-800">Painel Administrativo</h1>
                    <button
                        onClick={() => handleOpenModal()}
                        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
                    >
                        Adicionar Novo Imóvel
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-500">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Foto</th>
                                <th scope="col" className="px-6 py-3">Imóvel</th>
                                <th scope="col" className="px-6 py-3">Corretor</th>
                                <th scope="col" className="px-6 py-3">Cidade</th>
                                <th scope="col" className="px-6 py-3">Tipo</th>
                                <th scope="col" className="px-6 py-3">Preço</th>
                                <th scope="col" className="px-6 py-3 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {propertiesToDisplay.map(property => (
                                <tr key={property.id} className="bg-white border-b hover:bg-slate-50">
                                    <td className="px-6 py-4">
                                        {property.photoUrls && property.photoUrls.length > 0 ? (
                                            <img
                                            src={property.photoUrls[0]}
                                            alt={`Foto do imóvel ${property.name}`}
                                            className="w-16 h-10 object-cover rounded-md shadow-sm"
                                            />
                                        ) : (
                                            <div className="w-16 h-10 bg-slate-200 rounded-md flex items-center justify-center text-xs text-slate-500">
                                            Sem foto
                                            </div>
                                        )}
                                    </td>
                                    <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                                        {property.name}
                                    </th>
                                    <td className="px-6 py-4">{property.realtorName || 'N/A'}</td>
                                    <td className="px-6 py-4">{property.city}</td>
                                    <td className="px-6 py-4 capitalize">{property.type}</td>
                                    <td className="px-6 py-4">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(property.price)}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center space-x-2">
                                            <button 
                                                onClick={() => onToggleFeatured(property.id)} 
                                                className={`p-2 rounded-full transition-colors ${property.featured ? 'text-amber-500 hover:bg-amber-100' : 'text-slate-400 hover:bg-slate-100'}`}
                                                title={property.featured ? "Remover do Destaque" : "Adicionar ao Destaque"}
                                                disabled={currentUser?.role === 'Colaborador'}
                                            >
                                                <StarIcon filled={property.featured} />
                                            </button>
                                            <button 
                                                onClick={() => handleOpenModal(property)}
                                                className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-sky-600 transition-colors"
                                                title="Editar"
                                            >
                                                <EditIcon />
                                            </button>
                                            <button 
                                                onClick={() => confirmDelete(property.id)}
                                                className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-red-600 transition-colors"
                                                title="Excluir"
                                            >
                                                <DeleteIcon />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                             {propertiesToDisplay.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="text-center py-10 text-slate-500">
                                        Nenhum imóvel cadastrado por você. Clique em "Adicionar Novo Imóvel" para começar.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
                    <div className="relative z-50 w-full max-w-2xl">
                         <button 
                            onClick={handleCloseModal}
                            className="absolute top-3 right-3 z-10 p-1 bg-white rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all"
                            aria-label="Fechar"
                         >
                            <CloseIcon />
                         </button>
                         <PropertyForm
                            onAddProperty={handleAddSubmit}
                            editingProperty={editingProperty}
                            onUpdateProperty={handleUpdateSubmit}
                            onCancelEdit={handleCloseModal}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminPage;