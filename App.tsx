
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

// Dados Iniciais (Padronizados para quando não houver LocalStorage)
const INITIAL_PROPERTIES: Property[] = [
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
      photoUrls: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1920&auto=format&fit=crop', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1920&auto=format&fit=crop'],
      featured: true,
      description: 'Este apartamento de 2 quartos oferece uma vida urbana vibrante, combinando conforto e conveniência. Localizado no coração da cidade, está a poucos passos de restaurantes, lojas e transportes públicos. O interior é bem iluminado, com acabamentos modernos e uma varanda com vista para a cidade. Ideal para quem busca um estilo de vida dinâmico.',
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
      videoEmbedCode: '',
      showVideo: false,
    },
    {
      id: '2',
      userId: 'collab-user-01',
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
      photoUrls: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop', 'https://images.unsplash.com/photo-1600585153316-6a524c7f395d?q=80&w=1920&auto=format&fit=crop'],
      photo360Url: 'https://kuula.co/share/collection/7F9sT?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1',
      featured: true,
      description: 'Uma casa espetacular com 4 suítes, design de conceito aberto e uma área de lazer completa com piscina e churrasqueira gourmet. O acabamento de alto padrão e a localização privilegiada fazem deste imóvel uma oportunidade única. Perfeita para famílias que valorizam conforto, segurança e estilo de vida.',
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
      videoEmbedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/ScMzIvxBSi4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
      showVideo: true,
    },
     {
      id: '3',
      userId: 'admin-user-02',
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
      photoUrls: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1920&auto=format&fit=crop', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1920&auto=format&fit=crop'],
      featured: false,
      description: 'Cobertura de luxo com vista 360 graus da cidade. Terraço privativo com jacuzzi, 3 suítes e acabamento de altíssimo padrão. Localização nobre na Savassi, próximo aos melhores restaurantes e lojas.',
      type: 'venda',
      propertyType: 'Cobertura',
      bedrooms: 3,
      bathrooms: 4,
      garageSpots: 3,
      privateArea: 280,
      totalArea: 400,
      yearBuilt: 2020,
      status: 'Novo',
      hasPool: false,
      hasBarbecueGrill: true,
      hasFireplace: true,
      hasBalcony: true,
      hasYard: false,
      isFurnished: false,
      videoEmbedCode: '',
      showVideo: false,
    },
];

const INITIAL_USERS: User[] = [
    { id: 'admin-user-01', fullName: 'Admin Geral', phone: '(00) 00000-0000', username: 'admin', password: 'admin123', role: 'Super Admin' },
    { id: 'user-sample-admin', fullName: 'Outro Admin', phone: '(11) 99999-9999', username: 'admin2', password: '123', role: 'Admin' },
    { id: 'user-sample-collab', fullName: 'Colaborador Um', phone: '(21) 98888-8888', username: 'colab', password: '123', role: 'Colaborador' },
];

const INITIAL_SETTINGS: SiteSettings = {
      logoUrl: 'https://img.logoipsum.com/296.svg',
      logoText: 'DIGIFOX',
      showLogoText: true,
      heroBanners: [
        { imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1920&auto=format&fit=crop', title: 'Encontre o Imóvel dos Seus Sonhos', subtitle: 'As melhores oportunidades estão aqui.', titleColor: '#FFFFFF', subtitleColor: '#E2E8F0', fontFamily: "'Poppins', sans-serif" },
        { imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1920&auto=format&fit=crop', title: 'Consultoria Especializada', subtitle: 'Nossa equipe está pronta para te ajudar.', titleColor: '#FFFFFF', subtitleColor: '#E2E8F0', fontFamily: "'Montserrat', sans-serif" },
        { imageUrl: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=1920&auto=format&fit=crop', title: 'Venda ou Alugue Conosco', subtitle: 'Anuncie seu imóvel com a melhor assessoria.', titleColor: '#FFFFFF', subtitleColor: '#E2E8F0', fontFamily: "'Roboto', sans-serif" },
      ],
      footerContactEmail: 'contato@digifox.com.br',
      footerContactPhone: '(11) 98765-4321',
      footerFacebookUrl: 'https://facebook.com',
      footerInstagramUrl: 'https://instagram.com',
      footerLinkedInUrl: 'https://linkedin.com',
      footerDescription: 'Encontrando o seu lugar no mundo.',
      footerCopyright: 'DIGIFOX. Todos os direitos reservados.',
      aboutPageImageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1920&auto=format&fit=crop',
      aboutPageHistory: 'Fundada em 2023, a DIGIFOX nasceu do sonho de modernizar o mercado imobiliário, combinando tecnologia de ponta com um atendimento humano e personalizado. Nossa jornada é marcada pela busca incessante por inovação e pela satisfação de cada cliente.',
      aboutPageMission: 'Nossa missão é conectar pessoas aos seus lares e investimentos ideais, oferecendo uma experiência de compra, venda e locação transparente, eficiente e segura. Acreditamos que a tecnologia é a ferramenta para simplificar processos e potencializar decisões.',
      aboutPageValues: 'Inovação: Buscamos constantemente novas tecnologias.\nTransparência: Clareza em cada etapa do processo.\nExcelência: Compromisso com a mais alta qualidade.\nCliente no Centro: Suas necessidades guiam nossas ações.\nÉtica: Integridade e respeito em todas as relações.',
      contactFormRecipientEmail: 'contato@suaempresa.com',
      companyAddress: 'Rua Inovação, 123, Bairro Tech, São Paulo - SP',
      mapEmbedCode: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.106692823097!2d-46.6565712850222!3d-23.56407628468153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0x2021565136629989!2sAvenida%20Paulista%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1678887123456!5m2!1spt-BR!2sbr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
      // Estilos fixos (Tema Escuro) - Não editáveis, mas parte do objeto para compatibilidade
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

const App: React.FC = () => {
  // Inicialização de Estado com LocalStorage
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('properties');
    return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('siteSettings');
    if (saved) {
        // Merge para garantir que novas propriedades adicionadas ao tipo SiteSettings existam
        return { ...INITIAL_SETTINGS, ...JSON.parse(saved) };
    }
    return INITIAL_SETTINGS;
  });

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
  
  // Persistência de Dados (Efeitos)
  useEffect(() => {
    localStorage.setItem('properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('siteSettings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  // Aplicação da Imagem de Fundo (se houver)
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
  
  const handleAddUser = (newUser: Omit<User, 'id'>): { success: boolean, message: string } => {
    if (users.some(u => u.username === newUser.username)) {
      showToast('Este nome de usuário já está em uso.', 'error');
      return { success: false, message: 'Este nome de usuário já está em uso.' };
    }
    const user = { ...newUser, id: `user-${Date.now()}` };
    setUsers([...users, user]);
    showToast(`${user.role} adicionado com sucesso!`);
    setPage('admins');
    return { success: true, message: '' };
  };

  const handleUpdateUser = (updatedUser: User) => {
     const originalUser = users.find(u => u.id === updatedUser.id);
    if (!currentUser || !originalUser) return;
    
    // Ninguém edita Super Admin (exceto ele mesmo)
    if (originalUser.role === 'Super Admin' && currentUser.id !== originalUser.id) {
       showToast('Você não tem permissão para editar o Administrador Principal.', 'error');
       return;
    }
    
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    showToast('Usuário atualizado com sucesso!');
    setPage('admins');
    setEditingUserId(null);
  };

  const handleDeleteUser = (userId: string) => {
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
            setUsers(prev => prev.filter(user => user.id !== userId));
            showToast('Usuário deletado com sucesso!');
            if (currentUser.id === userId) {
                handleLogout();
            }
        }
    }
  };

  // Handlers de Imóveis
  const handleAddProperty = (property: Omit<Property, 'id' | 'userId'>) => {
    const newProperty: Property = {
      ...property,
      id: `prop-${Date.now()}`,
      userId: currentUser?.id,
    };
    setProperties(prev => [newProperty, ...prev]);
    showToast(`Imóvel "${newProperty.name}" adicionado com sucesso!`);
  };

  const handleUpdateProperty = (updatedProperty: Property) => {
    // Super Admin e Admin podem editar qualquer imóvel
    if (currentUser?.role === 'Colaborador' && updatedProperty.userId !== currentUser.id) {
        showToast('Você não tem permissão para editar este imóvel.', 'error');
        return;
    }
    setProperties(prev => prev.map(p => p.id === updatedProperty.id ? updatedProperty : p));
    showToast(`Imóvel "${updatedProperty.name}" atualizado com sucesso!`);
  };

  const handleDeleteProperty = (propertyId: string) => {
    const propertyToDelete = properties.find(p => p.id === propertyId);
    // Super Admin e Admin podem deletar qualquer imóvel
    if (currentUser?.role === 'Colaborador' && propertyToDelete?.userId !== currentUser.id) {
        showToast('Você não tem permissão para excluir este imóvel.', 'error');
        return;
    }
    setProperties(prev => prev.filter(p => p.id !== propertyId));
    showToast('Imóvel excluído com sucesso!');
  };

  const handleToggleFeatured = (propertyId: string) => {
    const propertyToToggle = properties.find(p => p.id === propertyId);
    // Permite que colaboradores destaquem seus próprios imóveis
    if (currentUser?.role === 'Colaborador' && propertyToToggle?.userId !== currentUser.id) {
         showToast('Você só pode destacar seus próprios imóveis.', 'error');
         return;
    }
    setProperties(prev => prev.map(p => p.id === propertyId ? { ...p, featured: !p.featured } : p));
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
  const handleSaveSettings = (newSettings: SiteSettings) => {
    setSiteSettings(newSettings);
    showToast('Configurações salvas com sucesso!');
    setPage('admin');
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
