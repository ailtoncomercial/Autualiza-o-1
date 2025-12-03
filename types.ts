
export interface Property {
  id: string;
  userId?: string; // ID do usuário que cadastrou o imóvel
  name: string;
  realtorName?: string; // Corretor responsável pelo imóvel
  address: string;
  city: string;
  state: string;
  neighborhood: string;
  zipCode: string;
  price: number;
  condoFee?: number;
  iptu?: number;
  photoUrls: string[];
  photo360Url?: string; // URL para foto/tour 360°
  featured: boolean;
  description: string;
  type: 'venda' | 'aluguel';
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  garageSpots: number;
  privateArea: number; // em m²
  totalArea: number; // em m²
  yearBuilt?: number;
  status: 'Novo' | 'Usado' | 'Lançamento';
  
  // Características
  hasPool: boolean;
  hasBarbecueGrill: boolean;
  hasFireplace: boolean;
  hasBalcony: boolean;
  hasYard: boolean;
  isFurnished: boolean;
  mapEmbedCode?: string; 
  
  // Vídeo
  videoEmbedCode?: string; // Novo: Código de incorporação do YouTube
  showVideo: boolean; // Novo: Opção para exibir ou não
}

export interface User {
  id: string;
  fullName: string;
  phone: string;
  username: string;
  password: string; // Em um aplicativo real, isso deve ser um hash
  role: 'Super Admin' | 'Admin' | 'Colaborador';
}

export interface Filters {
  type: 'todos' | 'venda' | 'aluguel';
  propertyType: string;
  city: string;
  state: string;
  neighborhood: string;
  bedrooms: number;
  bathrooms: number;
  priceMin: number;
  priceMax: number;
}

export interface HeroBanner {
  imageUrl: string;
  title: string;
  subtitle: string;
  titleColor: string;
  subtitleColor: string;
  fontFamily: string;
}

export interface SiteSettings {
  logoUrl: string;
  logoText: string;
  showLogoText: boolean;
  heroBanners: HeroBanner[];
  footerContactEmail: string;
  footerContactPhone: string;
  footerDescription: string; // Novo
  footerCopyright: string;   // Novo

  footerFacebookUrl: string;
  footerInstagramUrl: string;
  footerLinkedInUrl: string;
  aboutPageImageUrl: string;
  aboutPageHistory: string;
  aboutPageMission: string;
  aboutPageValues: string;
  contactFormRecipientEmail: string;
  companyAddress: string;
  mapEmbedCode: string;

  // Novas Configurações de Cor e Fundo
  backgroundColor: string;
  backgroundImageUrl: string;
  pageTitleColor: string;
  sectionTitleColor: string;
  bodyTextColor: string;
  bodyTextMutedColor: string;
  headerBackgroundColor: string;
  headerMenuColor: string;
  headerMenuHighlightColor: string;
  buttonColor: string;
  footerBackgroundColor: string;
}

export type Page = 'home' | 'login' | 'detail' | 'admin' | 'admins' | 'addUser' | 'editUser' | 'settings' | 'about' | 'contact' | 'location' | 'searchResults';