
// ... (imports remain the same)
import React, { useState, useMemo, useEffect } from 'react';
import { Property, User, Filters, SiteSettings, Page } from './types';
import Header from './components/Header';
import PropertyCard from './components/PropertyCard';
import PropertyDetail from './components/PropertyDetail';
import LoginPage from './components/LoginPage';
import AdminPage from './components/AdminPage';
import AdminsManagementPage from './components/AdminsManagementPage';
import AddUserPage from './components/AddUserPage';
import SiteSettingsPage from './components/SiteSettingsPage';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import LocationPage from './components/LocationPage';
import SearchResultsPage from './components/SearchResultsPage';

// ... (Toast component remains the same)
interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 300);
        }, 5000);

        return () => clearTimeout(timer);
    }, [message, onClose]);

    const handleClose = () => {
        setVisible(false);
        setTimeout(onClose, 300);
    }

    const baseStyle = "bg-slate-800/80 backdrop-blur-sm border";
    const successStyle = "border-section-title/50";
    const errorStyle = "border-red-500/50";
    
    const icon = type === 'success' ? 
        <svg className="w-6 h-6 text-section-title" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> : 
        <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;

    return (
        <div className={`fixed bottom-5 right-5 z-50 transition-all duration-300 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className={`flex items-center p-4 rounded-lg shadow-lg ${baseStyle} ${type === 'success' ? successStyle : errorStyle} max-w-sm`}>
                <div className="flex-shrink-0">{icon}</div>
                <div className="ml-3 text-sm font-medium text-body">{message}</div>
                <button onClick={handleClose} className="ml-4 -mr-2 -my-2 p-2 rounded-md hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500" aria-label="Fechar">
                    <svg className="w-5 h-5 text-muted" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </div>
        </div>
    );
};

// Configuração Padrão Segura (Fallback)
const INITIAL_SETTINGS: SiteSettings = {
      logoUrl: '',
      logoText: 'DIGIFOX',
      showLogoText: true,
      heroBanners: [],
      footerContactEmail: '',
      footerContactPhone: '',
      footerFacebookUrl: '',
      footerInstagramUrl: '',
      footerLinkedInUrl: '',
      footerDescription: '',
      footerCopyright: '',
      aboutPageImageUrl: '',
      aboutPageHistory: '',
      aboutPageMission: '',
      aboutPageValues: '',
      contactFormRecipientEmail: '',
      companyAddress: '',
      mapEmbedCode: '',
      backgroundColor: '#0f172a',
      backgroundImageUrl: '',
      pageTitleColor: '#ffffff',
      sectionTitleColor: '#22d3ee',
      bodyTextColor: '#cbd5e1',
      bodyTextMutedColor: '#94a3b8',
      headerBackgroundColor: '#1e293b',
      headerMenuColor: '#cbd5e1',
      headerMenuHighlightColor: '#22d3ee',
      buttonColor: '#22d3ee',
      footerBackgroundColor: '#020617',
};

const API_URL = 'http://localhost:3001/api';

const App: React.FC = () => {
  // Inicialização de Estado Vazia (dados virão da API)
  const [properties, setProperties] = useState<Property[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [page, setPage] = useState<Page>('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const initialFilters: Filters = {
    type: 'todos',
    propertyType: '',
    city: '',
    state: '',
    neighborhood: '',
    bedrooms: 0,
    bathrooms: 0,
    priceMin: 0,
    priceMax: 10000000
  };
  const [filters, setFilters] = useState<Filters>(initialFilters);
  
  // Carregar Dados do Servidor
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/data`);
        if (!res.ok) throw new Error('Falha ao conectar com o servidor');
        const data = await res.json();
        
        setProperties(data.properties || []);
        setUsers(data.users || []);
        if (data.settings && Object.keys(data.settings).length > 0) {
            setSiteSettings({ ...INITIAL_SETTINGS, ...data.settings });
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        showToast('Erro ao conectar com o servidor. Verifique se o backend está rodando.', 'error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Persistência de Dados (Efeitos removidos - agora usamos handlers assíncronos)

  // Aplicação da Imagem de Fundo
  useEffect(() => {
    document.body.style.backgroundImage = siteSettings.backgroundImageUrl ? `url(${siteSettings.backgroundImageUrl})` : 'none';
  }, [siteSettings.backgroundImageUrl]);


  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
  };
  
  // Handlers de Autenticação
  const handleLogin = (username: string, pass: string): boolean => {
    const user = users.find(u => u.username === username && u.password === pass);
    if (user) {
      setCurrentUser(user);
      setPage('admin');
      return true;
    }
    return false;
  };
  const handleLogout = () => { setCurrentUser(null); setPage('home'); };
  
  const handleAddUser = async (newUser: Omit<User, 'id'>): Promise<{ success: boolean, message: string }> => {
    if (users.some(u => u.username === newUser.username)) {
      showToast('Este nome de usuário já está em uso.', 'error');
      return { success: false, message: 'Este nome de usuário já está em uso.' };
    }
    
    const user = { ...newUser, id: `user-${Date.now()}` };
    
    try {
        const res = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        if (!res.ok) throw new Error('Erro ao salvar no servidor');
        
        setUsers([...users, user]);
        showToast(`${user.role} adicionado com sucesso!`);
        setPage('admins');
        return { success: true, message: '' };
    } catch (e) {
        showToast('Erro ao salvar usuário no servidor.', 'error');
        return { success: false, message: 'Erro de servidor.' };
    }
  };

  const handleUpdateUser = async (updatedUser: User) => {
     const originalUser = users.find(u => u.id === updatedUser.id);
    if (!currentUser || !originalUser) return;
    
    if (originalUser.role === 'Super Admin' && currentUser.id !== originalUser.id) {
       showToast('Você não tem permissão para editar o Administrador Principal.', 'error');
       return;
    }
    
    try {
        const res = await fetch(`${API_URL}/users/${updatedUser.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUser)
        });
        if(!res.ok) throw new Error();

        setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
        showToast('Usuário atualizado com sucesso!');
        setPage('admins');
        setEditingUserId(null);
    } catch(e) {
        showToast('Erro ao atualizar usuário.', 'error');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    const userToDelete = users.find(u => u.id === userId);
    
    if (!userToDelete || !currentUser) return;

    if (userToDelete.role === 'Super Admin') {
        showToast('Não é possível excluir um Administrador Principal.', 'error');
        return;
    }

    let permissionGranted = false;

    if (currentUser.role === 'Super Admin') {
        permissionGranted = true;
    } else if (currentUser.role === 'Admin') {
        if (userToDelete.role === 'Colaborador') {
            permissionGranted = true;
        } else {
             showToast('Administradores só podem excluir Colaboradores.', 'error');
             return;
        }
    } else {
        showToast('Você não tem permissão para excluir usuários.', 'error');
        return;
    }

    if (permissionGranted) {
        if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
            try {
                const res = await fetch(`${API_URL}/users/${userId}`, { method: 'DELETE' });
                if(!res.ok) throw new Error();

                setUsers(prev => prev.filter(user => user.id !== userId));
                showToast('Usuário deletado com sucesso!');
                if (currentUser.id === userId) {
                    handleLogout();
                }
            } catch (e) {
                showToast('Erro ao deletar usuário.', 'error');
            }
        }
    }
  };

  // Handlers de Imóveis
  const handleAddProperty = async (propertyData: Omit<Property, 'id' | 'userId'>) => {
    const newProperty: Property = {
      ...propertyData,
      id: `prop-${Date.now()}`,
      userId: currentUser?.id,
    };
    
    try {
        const res = await fetch(`${API_URL}/properties`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProperty)
        });
        if(!res.ok) throw new Error();

        setProperties(prev => [newProperty, ...prev]);
        showToast(`Imóvel "${newProperty.name}" adicionado com sucesso!`);
    } catch(e) {
        showToast('Erro ao adicionar imóvel.', 'error');
    }
  };

  const handleUpdateProperty = async (updatedProperty: Property) => {
    if (currentUser?.role === 'Colaborador' && updatedProperty.userId !== currentUser.id) {
        showToast('Você não tem permissão para editar este imóvel.', 'error');
        return;
    }
    
    try {
        const res = await fetch(`${API_URL}/properties/${updatedProperty.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProperty)
        });
        if(!res.ok) throw new Error();

        setProperties(prev => prev.map(p => p.id === updatedProperty.id ? updatedProperty : p));
        showToast(`Imóvel "${updatedProperty.name}" atualizado com sucesso!`);
    } catch(e) {
        showToast('Erro ao atualizar imóvel.', 'error');
    }
  };

  const handleDeleteProperty = async (propertyId: string) => {
    const propertyToDelete = properties.find(p => p.id === propertyId);
    if (currentUser?.role === 'Colaborador' && propertyToDelete?.userId !== currentUser.id) {
        showToast('Você não tem permissão para excluir este imóvel.', 'error');
        return;
    }
    
    try {
        const res = await fetch(`${API_URL}/properties/${propertyId}`, { method: 'DELETE' });
        if(!res.ok) throw new Error();

        setProperties(prev => prev.filter(p => p.id !== propertyId));
        showToast('Imóvel excluído com sucesso!');
    } catch(e) {
        showToast('Erro ao excluir imóvel.', 'error');
    }
  };

  const handleToggleFeatured = async (propertyId: string) => {
    const propertyToToggle = properties.find(p => p.id === propertyId);
    if (!propertyToToggle) return;

    if (currentUser?.role === 'Colaborador' && propertyToToggle.userId !== currentUser.id) {
         showToast('Você só pode destacar seus próprios imóveis.', 'error');
         return;
    }
    
    const updatedProperty = { ...propertyToToggle, featured: !propertyToToggle.featured };
    
    try {
        // Reusa o endpoint de update
        const res = await fetch(`${API_URL}/properties/${propertyId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProperty)
        });
        if(!res.ok) throw new Error();

        setProperties(prev => prev.map(p => p.id === propertyId ? updatedProperty : p));
    } catch(e) {
        showToast('Erro ao alterar destaque.', 'error');
    }
  };
  
  const handleViewProperty = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
    setPage('detail');
  };
  const handleGoBack = () => {
    setSelectedPropertyId(null);
    setPage('home');
  };
  const handleFilterChange = (filterName: keyof Filters, value: string | number) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };
  const handleSearch = () => {
    setPage('searchResults');
  };
  const handleEditUserClick = (userId: string) => {
    setEditingUserId(userId);
    setPage('editUser');
  };
  const handleSaveSettings = async (newSettings: SiteSettings) => {
    try {
        const res = await fetch(`${API_URL}/settings`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newSettings)
        });
        if(!res.ok) throw new Error();

        setSiteSettings(newSettings);
        showToast('Configurações salvas com sucesso!');
        setPage('admin');
    } catch(e) {
        showToast('Erro ao salvar configurações.', 'error');
    }
  };

  const selectedProperty = useMemo(() => {
    return properties.find(p => p.id === selectedPropertyId);
  }, [properties, selectedPropertyId]);

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
        const { type, propertyType, city, state, neighborhood, bedrooms, bathrooms } = filters;
        if (type !== 'todos' && p.type !== type) return false;
        if (propertyType && p.propertyType !== propertyType) return false;
        if (city && !p.city.toLowerCase().includes(city.toLowerCase())) return false;
        if (state && !p.state.toLowerCase().includes(state.toLowerCase())) return false;
        if (neighborhood && !p.neighborhood.toLowerCase().includes(neighborhood.toLowerCase())) return false;
        if (bedrooms > 0 && p.bedrooms < bedrooms) return false;
        if (bathrooms > 0 && p.bathrooms < bathrooms) return false;
        return true;
    });
  }, [properties, filters]);

  const featuredProperties = useMemo(() => properties.filter(p => p.featured), [properties]);

  const renderPage = () => {
    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center text-white">Carregando dados...</div>;
    }

    switch (page) {
      case 'home':
        return (
          <>
            <Hero 
              banners={siteSettings.heroBanners}
              isAuthenticated={!!currentUser}
              logoUrl={siteSettings.logoUrl}
              logoText={siteSettings.logoText}
              showLogoText={siteSettings.showLogoText}
              headerBackgroundColor={siteSettings.headerBackgroundColor}
              headerMenuColor={siteSettings.headerMenuColor}
              headerMenuHighlightColor={siteSettings.headerMenuHighlightColor}
              onAdminClick={() => setPage(currentUser ? 'admin' : 'login')}
              onLogoClick={() => setPage('home')}
              onNavigateToAbout={() => setPage('about')}
              onNavigateToContact={() => setPage('contact')}
              onNavigateToLocation={() => setPage('location')}
              onLogout={handleLogout}
            >
               <FilterBar filters={filters} onFilterChange={handleFilterChange} onSearch={handleSearch} />
            </Hero>
            <main className="container mx-auto p-4 lg:p-8">
              <section id="available" className="mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-page-title animate-fade-in-up">Imóveis Disponíveis</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {properties.map((property, index) => (
                          <div key={property.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in-up opacity-0">
                            <PropertyCard property={property} onViewProperty={handleViewProperty} />
                          </div>
                      ))}
                  </div>
              </section>
               {featuredProperties.length > 0 && (
                <section id="featured" className="py-16 bg-slate-800/20 rounded-lg">
                    <h2 className="text-3xl font-bold mb-6 text-center text-page-title animate-fade-in-up">Nossos Destaques</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                        {featuredProperties.map((property, index) => (
                          <div key={property.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in-up opacity-0">
                            <PropertyCard property={property} onViewProperty={handleViewProperty} />
                          </div>
                        ))}
                    </div>
                </section>
              )}
            </main>
          </>
        );
      case 'detail':
        if (!selectedProperty) return <div>Imóvel não encontrado.</div>;
        
        return <PropertyDetail 
                  property={selectedProperty} 
                  onGoBack={handleGoBack} 
                  users={users} 
                  settings={siteSettings} 
               />;
      case 'login':
        return <LoginPage onLogin={handleLogin} onGoBackToHome={() => setPage('home')} />;
      case 'admin':
        return <AdminPage properties={properties} currentUser={currentUser} onAddProperty={handleAddProperty} onUpdateProperty={handleUpdateProperty} onDeleteProperty={handleDeleteProperty} onToggleFeatured={handleToggleFeatured} onGoBackToHome={() => setPage('home')} onManageAdmins={() => setPage('admins')} onManageSite={() => setPage('settings')} />;
      case 'admins':
         if (!currentUser || currentUser.role === 'Colaborador') { setPage('admin'); return null; }
        return <AdminsManagementPage users={users} currentUser={currentUser} onGoBackToAdmin={() => setPage('admin')} onDeleteUser={handleDeleteUser} onAddUserClick={() => setPage('addUser')} onEditUser={handleEditUserClick} />;
      case 'addUser':
         if (!currentUser || currentUser.role === 'Colaborador') { setPage('admin'); return null; }
        return <AddUserPage onAddUser={handleAddUser} onCancel={() => setPage('admins')} currentUser={currentUser} />;
      case 'editUser': {
        if (!currentUser || currentUser.role === 'Colaborador') { setPage('admin'); return null; }
        const userToEdit = users.find(u => u.id === editingUserId);
        if (!userToEdit) {
            showToast('Usuário não encontrado.', 'error');
            setPage('admins');
            return null;
        }
        return <AddUserPage onUpdateUser={handleUpdateUser} onCancel={() => setPage('admins')} currentUser={currentUser} userToEdit={userToEdit} />;
      }
      case 'settings':
         if (currentUser?.role !== 'Super Admin') { setPage('admin'); return null; }
        return <SiteSettingsPage currentSettings={siteSettings} onSave={handleSaveSettings} onCancel={() => setPage('admin')} />;
       case 'about':
        return <AboutPage onGoBackToHome={() => setPage('home')} settings={siteSettings} />;
      case 'contact':
        return <ContactPage onGoBackToHome={() => setPage('home')} settings={siteSettings} />;
      case 'location':
        return <LocationPage onGoBackToHome={() => setPage('home')} settings={siteSettings} />;
      case 'searchResults':
        return <SearchResultsPage properties={filteredProperties} onViewProperty={handleViewProperty} initialFilters={filters} onFilterChange={handleFilterChange} />;
      default:
        return <div>Página não encontrada</div>;
    }
  };

  return (
    <>
      {page !== 'home' && (
        <Header
            isAuthenticated={!!currentUser}
            logoUrl={siteSettings.logoUrl}
            logoText={siteSettings.logoText}
            showLogoText={siteSettings.showLogoText}
            backgroundColor={siteSettings.headerBackgroundColor}
            menuColor={siteSettings.headerMenuColor}
            menuHighlightColor={siteSettings.headerMenuHighlightColor}
            onLogout={handleLogout}
            onAdminClick={() => setPage(currentUser ? 'admin' : 'login')}
            onLogoClick={() => setPage('home')}
            onNavigateToAbout={() => setPage('about')}
            onNavigateToContact={() => setPage('contact')}
            onNavigateToLocation={() => setPage('location')}
        />
      )}
      
      {renderPage()}
      
      <Footer 
        settings={siteSettings}
        onNavigateToAbout={() => setPage('about')}
        onNavigateToContact={() => setPage('contact')}
        onNavigateToLocation={() => setPage('location')}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default App;
