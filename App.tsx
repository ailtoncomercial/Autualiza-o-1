import React, { useState, useMemo, useEffect } from 'react';
import { Property, User, Filters, SiteSettings, Page } from './types';
import Header from './components/Header';
import PropertyCard from './components/PropertyCard';
import PropertyDetail from './components/PropertyDetail';
import LoginPage from './components/LoginPage';
import AdminPage from './components/AdminPage';
import AdminsManagementPage from './components/AdminsManagementPage';
import AddCollaboratorPage from './components/AddCollaboratorPage';
import SiteSettingsPage from './components/SiteSettingsPage';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import LocationPage from './components/LocationPage'; // Novo

// --- Componente de Notificação (Toast) ---
interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true); // Animação de entrada
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 300); // Chama onClose após a animação de saída
        }, 5000);

        return () => clearTimeout(timer);
    }, [message, onClose]);

    const handleClose = () => {
        setVisible(false);
        setTimeout(onClose, 300);
    }

    const icon = type === 'success' ? 
        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> : 
        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;

    return (
        <div className={`fixed bottom-5 right-5 z-50 transition-all duration-300 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className={`flex items-center p-4 rounded-lg shadow-lg border ${type === 'success' ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'} max-w-sm`}>
                <div className="flex-shrink-0">{icon}</div>
                <div className="ml-3 text-sm font-medium text-slate-800">{message}</div>
                <button onClick={handleClose} className="ml-4 -mr-2 -my-2 p-2 rounded-md hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400" aria-label="Fechar">
                    <svg className="w-5 h-5 text-slate-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </div>
        </div>
    );
};


const App: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([
    {
      id: '1',
      userId: 'admin-user-01',
      name: 'Apartamento Aconchegante no Centro',
      realtorName: 'Carlos Silva',
      address: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      neighborhood: 'Centro',
      zipCode: '01001-000',
      price: 1250000,
      condoFee: 800,
      iptu: 2500,
      photoUrls: ['https://picsum.photos/seed/apartamento1/1200/800', 'https://picsum.photos/seed/apartamento2/1200/800'],
      featured: true,
      description: 'Este apartamento de 2 quartos oferece uma vida urbana vibrante...',
      type: 'venda',
      propertyType: 'Apartamento',
      bedrooms: 2,
      bathrooms: 2,
      garageSpots: 1,
      privateArea: 75,
      totalArea: 90,
      yearBuilt: 2015,
      status: 'Usado',
      hasPool: true,
      hasBarbecueGrill: true,
      hasFireplace: false,
      hasBalcony: true,
      hasYard: false,
      isFurnished: false,
      mapEmbedCode: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.4323992257!2d-46.63654068502253!3d-23.5512799846875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5849d3a55555%3A0x70863155826f21b7!2sR.%20das%20Flores%2C%20123%20-%20Centro%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001001-000!5e0!3m2!1spt-BR!2sbr!4v1678887123456!5m2!1spt-BR!2sbr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    },
    {
      id: '2',
      userId: 'admin-user-01',
      name: 'Casa Moderna com Piscina',
      realtorName: 'Fernanda Lima',
      address: 'Avenida do Sol, 456',
      city: 'Rio de Janeiro',
      state: 'RJ',
      neighborhood: 'Barra da Tijuca',
      zipCode: '22620-172',
      price: 3500000,
      condoFee: 1500,
      iptu: 8000,
      photoUrls: ['https://picsum.photos/seed/casa1/1200/800', 'https://picsum.photos/seed/casa2/1200/800'],
      photo360Url: 'https://kuula.co/share/collection/7F9sT?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1',
      featured: true,
      description: 'Uma casa espetacular com 4 suítes, design de conceito aberto...',
      type: 'venda',
      propertyType: 'Casa',
      bedrooms: 4,
      bathrooms: 5,
      garageSpots: 4,
      privateArea: 320,
      totalArea: 500,
      yearBuilt: 2018,
      status: 'Usado',
      hasPool: true,
      hasBarbecueGrill: true,
      hasFireplace: true,
      hasBalcony: false,
      hasYard: true,
      isFurnished: true,
    },
     {
      id: '3',
      userId: 'admin-user-01',
      name: 'Cobertura Duplex com Vista Panorâmica',
      realtorName: 'Carlos Silva',
      address: 'Praça da Liberdade, 789',
      city: 'Belo Horizonte',
      state: 'MG',
      neighborhood: 'Savassi',
      zipCode: '30140-010',
      price: 5800000,
      condoFee: 2200,
      iptu: 12000,
      photoUrls: [
        'https://picsum.photos/seed/cobertura1/1200/800',
        'https://picsum.photos/seed/cobertura2/1200/800',
      ],
      featured: false,
      description: 'Viva no topo da cidade nesta cobertura duplex exclusiva...',
      type: 'aluguel',
      propertyType: 'Cobertura',
      bedrooms: 3,
      bathrooms: 4,
      garageSpots: 3,
      privateArea: 250,
      totalArea: 280,
      yearBuilt: 2022,
      status: 'Novo',
      hasPool: true,
      hasBarbecueGrill: true,
      hasFireplace: false,
      hasBalcony: true,
      hasYard: false,
      isFurnished: false,
    },
  ]);
  const [page, setPage] = useState<Page>('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  const [users, setUsers] = useState<User[]>([
    { id: 'admin-user-01', fullName: 'Administrador', phone: '5541996013031', role: 'Administrador', username: 'admin', password: 'admin123' }
  ]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [filters, setFilters] = useState<Filters>({
    type: 'todos',
    propertyType: '',
    city: '',
    state: '',
    neighborhood: '',
    bedrooms: 0,
    bathrooms: 0,
    priceMin: 0,
    priceMax: 0,
  });
  
    const [siteSettings, setSiteSettings] = useState<SiteSettings>({
        logoUrl: 'https://images.weserv.nl/?url=i.imgur.com/gGAnm2E.png&w=100',
        heroImageUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1920&auto=format&fit=crop',
        footerContactEmail: 'contato@digifox.com.br',
        footerContactPhone: '(11) 98765-4321',
        footerFacebookUrl: '#',
        footerInstagramUrl: '#',
        footerLinkedInUrl: '#',
        headerBackgroundColor: '#ffffff',
        footerBackgroundColor: '#1e293b',
        aboutPageImageUrl: 'https://images.unsplash.com/photo-1516542478280-864afee4879e?q=80&w=1920&auto=format&fit=crop',
        aboutPageHistory: 'Fundada em 2023, a DIGIFOX Imóveis nasceu da paixão por conectar pessoas aos seus lares ideais. Começamos como uma pequena equipe com um grande sonho: transformar a experiência de compra, venda e aluguel de imóveis através da tecnologia e de um atendimento humano e personalizado. Hoje, somos referência no mercado, orgulhosos de cada cliente que ajudamos a encontrar o seu lugar no mundo.',
        aboutPageMission: 'Nossa missão é simplificar o mercado imobiliário, oferecendo soluções inovadoras e um serviço transparente e eficiente. Acreditamos que a busca por um imóvel deve ser uma jornada prazerosa e segura, e trabalhamos incansavelmente para que cada cliente se sinta confiante e satisfeito em todas as etapas do processo.',
        aboutPageValues: 'Ética e Transparência: Conduzimos nossos negócios com integridade, clareza e honestidade.\nFoco no Cliente: As necessidades e os sonhos dos nossos clientes são a nossa prioridade máxima.\nInovação: Buscamos constantemente novas tecnologias e métodos para melhorar nossos serviços.\nExcelência: Comprometemo-nos com a mais alta qualidade em tudo o que fazemos.\nPaixão: Somos apaixonados pelo que fazemos e celebramos cada conquista junto aos nossos clientes.',
        contactFormRecipientEmail: 'contato@digifox.com.br',
        companyAddress: 'Rua Exemplo, 123, Bairro, Cidade - Estado, CEP 00000-000',
        mapEmbedCode: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197534434444!2d-46.65873998502223!3d-23.56133938468224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0x2025d4d3851a6999!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1678886980005!5m2!1spt-BR!2sbr" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>', // Novo
    });

  interface Notification {
    id: number;
    message: string;
    type: 'success' | 'error';
  }
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ id: Date.now(), message, type });
  };

  const handleUpdateSiteSettings = (newSettings: SiteSettings) => {
    setSiteSettings(newSettings);
    showNotification('Configurações do site salvas com sucesso!');
    setPage('admin');
  };

  const handleLogin = (username: string, pass: string): boolean => {
    const user = users.find(u => u.username === username && u.password === pass);
    if (user) {
      setCurrentUser(user);
      setPage('admin');
      return true;
    }
    return false;
  };
  
  const handleRegister = (newUser: Omit<User, 'id' | 'role'>): { success: boolean, message: string } => {
    if (users.some(u => u.username === newUser.username)) {
      return { success: false, message: 'Este nome de usuário já existe.' };
    }
    const userWithId: User = { ...newUser, id: Date.now().toString(), role: 'Colaborador' };
    setUsers([...users, userWithId]);
    setCurrentUser(userWithId);
    setPage('admin');
    return { success: true, message: 'Cadastro realizado com sucesso!' };
  };

  const handleAddCollaborator = (newUser: Omit<User, 'id' | 'role'>): { success: boolean, message: string } => {
     if (users.some(u => u.username === newUser.username)) {
      return { success: false, message: 'Este nome de usuário já existe.' };
    }
    const userWithId: User = { ...newUser, id: Date.now().toString(), role: 'Colaborador' };
    setUsers(prev => [...prev, userWithId]);
    showNotification(`Colaborador "${userWithId.username}" adicionado com sucesso.`);
    setPage('admins');
    return { success: true, message: 'Colaborador adicionado com sucesso!' };
  }

  const handleLogout = () => {
    setCurrentUser(null);
    setPage('home');
  };

  const navigateToPage = (targetPage: Page) => {
    // Proteção de rota
    if ((targetPage === 'admin' || targetPage === 'admins' || targetPage === 'addCollaborator' || targetPage === 'settings') && !currentUser) {
        setPage('login');
        return;
    }
    if ((targetPage === 'admins' || targetPage === 'addCollaborator' || targetPage === 'settings') && currentUser?.role !== 'Administrador') {
        showNotification('Você não tem permissão para acessar esta página.', 'error');
        return;
    }
    setSelectedPropertyId(null);
    setPage(targetPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleAddProperty = (newProperty: Omit<Property, 'id' | 'userId'>) => {
    const propertyWithId = { 
        ...newProperty, 
        id: Date.now().toString(),
        userId: currentUser?.id, // Vincula o imóvel ao usuário logado
    };
    setProperties(prev => [propertyWithId, ...prev]);
    showNotification(`Imóvel "${newProperty.name}" adicionado com sucesso!`);
  };

  const handleUpdateProperty = (updatedProperty: Property) => {
    setProperties(prev => prev.map(p => (p.id === updatedProperty.id ? updatedProperty : p)));
    showNotification(`Imóvel "${updatedProperty.name}" atualizado com sucesso!`);
  };

  const handleDeleteProperty = (propertyId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este imóvel? Esta ação é irreversível.')) {
        setProperties(currentProperties => {
            const propertyToDelete = currentProperties.find(p => p.id === propertyId);
            if (propertyToDelete) {
                showNotification(`Imóvel "${propertyToDelete.name}" excluído com sucesso!`);
            }
            return currentProperties.filter(p => p.id !== propertyId);
        });
    }
  };
  
  const handleToggleFeatured = (propertyId: string) => {
      setProperties(prevProperties => {
        const newProperties = prevProperties.map(p => {
            if (p.id === propertyId) {
                return { ...p, featured: !p.featured };
            }
            return p;
        });
        
        const updatedProperty = newProperties.find(p => p.id === propertyId);
        if (updatedProperty) {
            const message = updatedProperty.featured
                ? `Imóvel "${updatedProperty.name}" adicionado aos destaques.`
                : `Imóvel "${updatedProperty.name}" removido dos destaques.`;
            showNotification(message);
        }

        return newProperties;
    });
  };

  const handleDeleteUser = (userId: string) => {
    const userToDelete = users.find(u => u.id === userId);
    if (!userToDelete) return;

    if (currentUser?.role !== 'Administrador') {
        showNotification('Você não tem permissão para excluir usuários.', 'error');
        return;
    }

    if (userToDelete.role === 'Administrador') {
      showNotification('O administrador principal não pode ser excluído.', 'error');
      return;
    }

    if (window.confirm(`Tem certeza que deseja excluir o colaborador "${userToDelete.username}"?`)) {
        setUsers(currentUsers => currentUsers.filter(u => u.id !== userId));
        showNotification(`Usuário "${userToDelete.username}" excluído com sucesso.`);
         if (currentUser?.id === userId) {
            handleLogout();
        }
    }
  };

  const handleViewProperty = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
    setPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (filterName: keyof Filters, value: string | number) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };
  
  const featuredProperties = useMemo(() => {
    return properties.filter(p => p.featured);
  }, [properties]);

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      const { type, propertyType, city, state, neighborhood, bedrooms, bathrooms, priceMin, priceMax } = filters;
      
      // Filtros da FilterBar
      if (type !== 'todos' && p.type !== type) return false;
      if (propertyType && p.propertyType.toLowerCase() !== propertyType.toLowerCase()) return false;
      if (city && !p.city.toLowerCase().includes(city.toLowerCase())) return false;
      if (state && !p.state.toLowerCase().includes(state.toLowerCase())) return false;
      if (neighborhood && !p.neighborhood.toLowerCase().includes(neighborhood.toLowerCase())) return false;
      if (bedrooms > 0 && p.bedrooms < bedrooms) return false;
      if (bathrooms > 0 && p.bathrooms < bathrooms) return false;
      if (priceMin > 0 && p.price < priceMin) return false;
      if (priceMax > 0 && p.price > priceMax) return false;

      return true;
    });
  }, [properties, filters]);

  const selectedProperty = properties.find(p => p.id === selectedPropertyId);

  const renderPage = () => {
    switch(page) {
      case 'login':
        return <LoginPage onLogin={handleLogin} onRegister={handleRegister} onGoBackToHome={() => navigateToPage('home')} />;
      case 'detail':
        const contactUser = users.find(u => u.id === selectedProperty?.userId);
        return selectedProperty ? <PropertyDetail property={selectedProperty} onGoBack={() => navigateToPage('home')} contactPhoneNumber={contactUser?.phone || '5541996013031'} /> : null;
      case 'admin':
         return currentUser ? (
            <AdminPage 
                properties={properties}
                currentUser={currentUser}
                onAddProperty={handleAddProperty}
                onUpdateProperty={handleUpdateProperty}
                onDeleteProperty={handleDeleteProperty}
                onToggleFeatured={handleToggleFeatured}
                onGoBackToHome={() => navigateToPage('home')}
                onManageAdmins={() => navigateToPage('admins')}
                onManageSite={() => navigateToPage('settings')}
            />
         ) : <LoginPage onLogin={handleLogin} onRegister={handleRegister} onGoBackToHome={() => navigateToPage('home')} />;
      case 'admins':
        return currentUser?.role === 'Administrador' ? (
            <AdminsManagementPage
                users={users}
                currentUser={currentUser}
                onGoBackToAdmin={() => navigateToPage('admin')}
                onDeleteUser={handleDeleteUser}
                onAddCollaboratorClick={() => navigateToPage('addCollaborator')}
            />
        ) : <LoginPage onLogin={handleLogin} onRegister={handleRegister} onGoBackToHome={() => navigateToPage('home')} />;
      case 'addCollaborator':
        return currentUser?.role === 'Administrador' ? (
          <AddCollaboratorPage
            onAddCollaborator={handleAddCollaborator}
            onCancel={() => navigateToPage('admins')}
          />
        ) : <LoginPage onLogin={handleLogin} onRegister={handleRegister} onGoBackToHome={() => navigateToPage('home')} />;
      case 'settings':
         return currentUser?.role === 'Administrador' ? (
          <SiteSettingsPage
            currentSettings={siteSettings}
            onSave={handleUpdateSiteSettings}
            onCancel={() => navigateToPage('admin')}
          />
        ) : <LoginPage onLogin={handleLogin} onRegister={handleRegister} onGoBackToHome={() => navigateToPage('home')} />;
      case 'about':
        return <AboutPage onGoBackToHome={() => navigateToPage('home')} settings={siteSettings} />;
      case 'contact':
        return <ContactPage onGoBackToHome={() => navigateToPage('home')} settings={siteSettings} />;
      case 'location':
        return <LocationPage onGoBackToHome={() => navigateToPage('home')} settings={siteSettings} />;
      case 'home':
      default:
        return (
          <>
            <Hero imageUrl={siteSettings.heroImageUrl}>
              <FilterBar filters={filters} onFilterChange={handleFilterChange} />
            </Hero>
            <main className="container mx-auto p-4 lg:p-8">
                {/* Seção de Imóveis Disponíveis */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 text-slate-700">Imóveis Disponíveis</h2>
                    {filteredProperties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProperties.map(property => (
                        <PropertyCard 
                            key={property.id} 
                            property={property} 
                            onViewProperty={handleViewProperty}
                        />
                        ))}
                    </div>
                    ) : (
                    <div className="text-center py-16 bg-white rounded-lg shadow">
                        <p className="text-slate-500 text-lg">Nenhum imóvel encontrado com os filtros selecionados.</p>
                    </div>
                    )}
                </div>
                
                {/* Seção de Destaques */}
                {featuredProperties.length > 0 && (
                <div className="bg-slate-200 rounded-lg p-6 lg:p-8">
                    <h2 className="text-3xl font-bold mb-6 text-slate-700">Nossos Destaques</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProperties.map(property => (
                        <PropertyCard 
                        key={property.id} 
                        property={property} 
                        onViewProperty={handleViewProperty}
                        />
                    ))}
                    </div>
                </div>
                )}
            </main>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col">
      <Header 
        logoUrl={siteSettings.logoUrl}
        backgroundColor={siteSettings.headerBackgroundColor}
        isAuthenticated={!!currentUser} 
        onLogout={handleLogout} 
        onAdminClick={() => navigateToPage(currentUser ? 'admin' : 'login')} 
        onLogoClick={() => navigateToPage('home')}
        onNavigateToAbout={() => navigateToPage('about')}
        onNavigateToContact={() => navigateToPage('contact')}
        onNavigateToLocation={() => navigateToPage('location')}
      />
      <div className="flex-grow">
        {renderPage()}
      </div>
      {notification && <Toast message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      <Footer 
        settings={siteSettings} 
        backgroundColor={siteSettings.footerBackgroundColor} 
        onNavigateToAbout={() => navigateToPage('about')}
        onNavigateToContact={() => navigateToPage('contact')}
        onNavigateToLocation={() => navigateToPage('location')}
      />
    </div>
  );
};

export default App;