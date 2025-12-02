import React, { useState, ChangeEvent, FormEvent } from 'react';
import { SiteSettings } from '../types';

interface SiteSettingsPageProps {
  currentSettings: SiteSettings;
  onSave: (newSettings: SiteSettings) => void;
  onCancel: () => void;
}

const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const PhotoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const SiteSettingsPage: React.FC<SiteSettingsPageProps> = ({ currentSettings, onSave, onCancel }) => {
  const [settings, setSettings] = useState<SiteSettings>(currentSettings);
  const [error, setError] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>, field: 'logoUrl' | 'heroImageUrl' | 'aboutPageImageUrl') => {
      const file = e.target.files?.[0];
      if (file) {
          if (file.size > 5 * 1024 * 1024) { // 5MB limit
              setError('A imagem não pode ter mais de 5MB.');
              return;
          }
          const reader = new FileReader();
          reader.onloadend = () => {
              setSettings(prev => ({ ...prev, [field]: reader.result as string }));
              setError('');
          };
          reader.readAsDataURL(file);
      }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(settings);
  };
  
  const renderFieldset = (legend: string, children: React.ReactNode) => (
    <fieldset className="border border-slate-300 p-4 rounded-md">
        <legend className="text-sm font-medium text-slate-600 px-2">{legend}</legend>
        <div className="space-y-4">
            {children}
        </div>
    </fieldset>
  );

  return (
    <main className="container mx-auto p-4 lg:p-8">
      <div className="mb-6">
        <button 
          onClick={onCancel}
          className="flex items-center text-sm font-medium text-sky-600 hover:text-sky-800 transition-colors"
        >
          <ArrowLeftIcon />
          Voltar para o Painel
        </button>
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">Configurações do Site</h1>
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">

            {renderFieldset('Aparência', <>
                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">Logo</label>
                    <div className="flex items-center space-x-4">
                        <img src={settings.logoUrl} alt="Logo Preview" className="h-16 w-auto bg-slate-100 p-1 rounded-md border" />
                        <label htmlFor="logo-upload" className="cursor-pointer bg-white py-2 px-3 border border-slate-300 rounded-md shadow-sm text-sm leading-4 font-medium text-slate-700 hover:bg-slate-50">
                            <span>Trocar Imagem</span>
                            <input id="logo-upload" name="logo-upload" type="file" className="sr-only" accept="image/png, image/jpeg" onChange={e => handleImageChange(e, 'logoUrl')} />
                        </label>
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">Imagem do Banner Principal</label>
                     <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md bg-cover bg-center" style={{backgroundImage: `url(${settings.heroImageUrl})`}}>
                        <div className="space-y-1 text-center bg-white bg-opacity-75 p-4 rounded-md">
                            <PhotoIcon />
                            <label htmlFor="hero-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-sky-600 hover:text-sky-500">
                                <span>Alterar imagem do banner</span>
                                <input id="hero-upload" name="hero-upload" type="file" className="sr-only" accept="image/jpeg" onChange={e => handleImageChange(e, 'heroImageUrl')} />
                            </label>
                            <p className="text-xs text-slate-500">JPG até 5MB</p>
                        </div>
                    </div>
                </div>
            </>)}

            {renderFieldset('Página Quem Somos', <>
                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">Imagem da Página</label>
                     <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md bg-cover bg-center" style={{backgroundImage: `url(${settings.aboutPageImageUrl})`}}>
                        <div className="space-y-1 text-center bg-white bg-opacity-75 p-4 rounded-md">
                            <PhotoIcon />
                            <label htmlFor="about-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-sky-600 hover:text-sky-500">
                                <span>Alterar imagem</span>
                                <input id="about-upload" name="about-upload" type="file" className="sr-only" accept="image/jpeg" onChange={e => handleImageChange(e, 'aboutPageImageUrl')} />
                            </label>
                            <p className="text-xs text-slate-500">JPG até 5MB</p>
                        </div>
                    </div>
                </div>
                <div>
                    <label htmlFor="aboutPageHistory" className="block text-sm font-medium text-slate-600">Nossa História</label>
                    <textarea id="aboutPageHistory" name="aboutPageHistory" value={settings.aboutPageHistory} onChange={handleInputChange} rows={5} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                </div>
                 <div>
                    <label htmlFor="aboutPageMission" className="block text-sm font-medium text-slate-600">Nossa Missão</label>
                    <textarea id="aboutPageMission" name="aboutPageMission" value={settings.aboutPageMission} onChange={handleInputChange} rows={4} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                </div>
                 <div>
                    <label htmlFor="aboutPageValues" className="block text-sm font-medium text-slate-600">Nossos Valores</label>
                     <textarea id="aboutPageValues" name="aboutPageValues" value={settings.aboutPageValues} onChange={handleInputChange} rows={6} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                     <p className="text-xs text-slate-500 mt-1">Dica: Coloque cada valor em uma nova linha.</p>
                </div>
            </>)}

            {renderFieldset('Cores do Site', <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div>
                        <label htmlFor="headerBackgroundColor" className="block text-sm font-medium text-slate-600">Cor do Cabeçalho</label>
                        <div className="mt-1 flex items-center space-x-2">
                            <input
                                type="color"
                                id="headerBackgroundColorPicker"
                                name="headerBackgroundColor"
                                value={settings.headerBackgroundColor}
                                onChange={handleInputChange}
                                className="h-10 w-10 p-1 border border-slate-300 rounded-md cursor-pointer"
                                title="Escolher cor"
                            />
                            <input
                                type="text"
                                id="headerBackgroundColor"
                                name="headerBackgroundColor"
                                value={settings.headerBackgroundColor}
                                onChange={handleInputChange}
                                placeholder="#ffffff"
                                className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="footerBackgroundColor" className="block text-sm font-medium text-slate-600">Cor do Rodapé</label>
                        <div className="mt-1 flex items-center space-x-2">
                            <input
                                type="color"
                                id="footerBackgroundColorPicker"
                                name="footerBackgroundColor"
                                value={settings.footerBackgroundColor}
                                onChange={handleInputChange}
                                className="h-10 w-10 p-1 border border-slate-300 rounded-md cursor-pointer"
                                title="Escolher cor"
                            />
                            <input
                                type="text"
                                id="footerBackgroundColor"
                                name="footerBackgroundColor"
                                value={settings.footerBackgroundColor}
                                onChange={handleInputChange}
                                placeholder="#1e293b"
                                className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                            />
                        </div>
                    </div>
                </div>
            </>)}

            {renderFieldset('Informações de Contato e Localização', <>
                 <div>
                    <label htmlFor="companyAddress" className="block text-sm font-medium text-slate-600">Endereço da Imobiliária</label>
                    <input type="text" name="companyAddress" id="companyAddress" value={settings.companyAddress} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"/>
                </div>
                <div>
                    <label htmlFor="mapEmbedCode" className="block text-sm font-medium text-slate-600">Código de Incorporação do Mapa</label>
                    <textarea id="mapEmbedCode" name="mapEmbedCode" value={settings.mapEmbedCode} onChange={handleInputChange} rows={4} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" placeholder="Cole o código <iframe> do Google Maps aqui." />
                    <p className="text-xs text-slate-500 mt-1">Obtenha o código em "Compartilhar" &gt; "Incorporar um mapa" no Google Maps.</p>
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div>
                        <label htmlFor="footerContactEmail" className="block text-sm font-medium text-slate-600">E-mail de Contato (Rodapé)</label>
                        <input type="email" name="footerContactEmail" id="footerContactEmail" value={settings.footerContactEmail} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"/>
                    </div>
                     <div>
                        <label htmlFor="footerContactPhone" className="block text-sm font-medium text-slate-600">Telefone de Contato (Rodapé)</label>
                        <input type="text" name="footerContactPhone" id="footerContactPhone" value={settings.footerContactPhone} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" placeholder="(XX) XXXXX-XXXX" />
                    </div>
                </div>
                <div>
                    <label htmlFor="contactFormRecipientEmail" className="block text-sm font-medium text-slate-600">E-mail para Receber Contatos (Página de Contato)</label>
                    <input type="email" name="contactFormRecipientEmail" id="contactFormRecipientEmail" value={settings.contactFormRecipientEmail} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"/>
                </div>
                 <div>
                    <label htmlFor="footerFacebookUrl" className="block text-sm font-medium text-slate-600">Link do Facebook</label>
                    <input type="url" name="footerFacebookUrl" id="footerFacebookUrl" value={settings.footerFacebookUrl} onChange={handleInputChange} placeholder="https://facebook.com/seu-perfil" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"/>
                </div>
                 <div>
                    <label htmlFor="footerInstagramUrl" className="block text-sm font-medium text-slate-600">Link do Instagram</label>
                    <input type="url" name="footerInstagramUrl" id="footerInstagramUrl" value={settings.footerInstagramUrl} onChange={handleInputChange} placeholder="https://instagram.com/seu-perfil" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"/>
                </div>
                <div>
                    <label htmlFor="footerLinkedInUrl" className="block text-sm font-medium text-slate-600">Link do LinkedIn</label>
                    <input type="url" name="footerLinkedInUrl" id="footerLinkedInUrl" value={settings.footerLinkedInUrl} onChange={handleInputChange} placeholder="https://linkedin.com/in/seu-perfil" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"/>
                </div>
            </>)}

            <div className="flex flex-col space-y-2 pt-4">
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                    Salvar Alterações
                </button>
                 <button type="button" onClick={onCancel} className="w-full flex justify-center py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">
                    Cancelar
                </button>
            </div>

          </form>
        </div>
      </div>
    </main>
  );
};

export default SiteSettingsPage;