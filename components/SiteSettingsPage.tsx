
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
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const ColorPicker: React.FC<{ label: string; value: string; onChange: (value: string) => void; }> = ({ label, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-body">{label}</label>
        <div className="mt-1 flex items-center space-x-2">
            <input 
                type="color" 
                value={value} 
                onChange={(e) => onChange(e.target.value)} 
                className="h-10 w-10 p-1 border border-slate-600 rounded-md cursor-pointer bg-slate-700" 
            />
            <input 
                type="text" 
                value={value} 
                onChange={(e) => onChange(e.target.value)} 
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-sm shadow-sm placeholder-muted text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
        </div>
    </div>
);


const SiteSettingsPage: React.FC<SiteSettingsPageProps> = ({ currentSettings, onSave, onCancel }) => {
  const [settings, setSettings] = useState<SiteSettings>(currentSettings);
  const [error, setError] = useState('');
  
  const inputStyles = "mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-sm shadow-sm placeholder-muted text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500";


  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
     if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setSettings(prev => ({ ...prev, [name]: checked }));
    } else {
        setSettings(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>, field: keyof SiteSettings | `heroBanners.${number}.imageUrl`) => {
      const file = e.target.files?.[0];
      if (file) {
          if (file.size > 5 * 1024 * 1024) { // 5MB limit
              setError('A imagem não pode ter mais de 5MB.');
              return;
          }
          const reader = new FileReader();
          reader.onloadend = () => {
              if (typeof field === 'string' && field.startsWith('heroBanners')) {
                  const index = parseInt(field.split('.')[1], 10);
                  const newBanners = [...settings.heroBanners];
                  newBanners[index] = { ...newBanners[index], imageUrl: reader.result as string };
                  setSettings(prev => ({ ...prev, heroBanners: newBanners }));
              } else {
                setSettings(prev => ({ ...prev, [field]: reader.result as string }));
              }
              setError('');
          };
          reader.readAsDataURL(file);
      }
  };
  
  const handleImageDelete = (field: keyof SiteSettings | `heroBanners.${number}.imageUrl`) => {
    if (typeof field === 'string' && field.startsWith('heroBanners')) {
        const index = parseInt(field.split('.')[1], 10);
        const newBanners = [...settings.heroBanners];
        newBanners[index] = { ...newBanners[index], imageUrl: '' };
        setSettings(prev => ({ ...prev, heroBanners: newBanners }));
    } else {
      setSettings(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBannerChange = (index: number, field: 'title' | 'subtitle' | 'titleColor' | 'subtitleColor' | 'fontFamily', value: string) => {
    const newBanners = [...settings.heroBanners];
    newBanners[index] = { ...newBanners[index], [field]: value };
    setSettings(prev => ({ ...prev, heroBanners: newBanners }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(settings);
  };
  
  const renderFieldset = (legend: string, children: React.ReactNode) => (
    <fieldset className="border border-slate-700 p-4 rounded-md">
        <legend className="text-sm font-medium text-section-title px-2">{legend}</legend>
        <div className="space-y-4">
            {children}
        </div>
    </fieldset>
  );

  const fontOptions = [
    { name: 'Poppins', value: "'Poppins', sans-serif" },
    { name: 'Roboto', value: "'Roboto', sans-serif" },
    { name: 'Montserrat', value: "'Montserrat', sans-serif" },
  ];

  return (
    <main className="container mx-auto p-4 lg:p-8 animate-fade-in-up">
      <div className="mb-6">
        <button 
          onClick={onCancel}
          className="flex items-center text-sm font-medium text-section-title hover:opacity-80 transition-colors"
        >
          <ArrowLeftIcon />
          Voltar para o Painel
        </button>
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-lg shadow-2xl shadow-black/20">
          <h1 className="text-3xl font-bold text-page-title mb-6 text-center">Configurações do Site</h1>
          {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">

            {renderFieldset('Aparência Geral', <>
                <div>
                    <label className="block text-sm font-medium text-body mb-2">Logo</label>
                    <div className="flex items-center space-x-4">
                        <img src={settings.logoUrl || 'https://via.placeholder.com/150x50/1e293b/94a3b8?text=Logo'} alt="Logo Preview" className="h-16 w-auto bg-slate-700 p-1 rounded-md border border-slate-600" />
                        <label htmlFor="logo-upload" className="cursor-pointer bg-slate-700 py-2 px-3 border border-slate-600 rounded-md shadow-sm text-sm leading-4 font-medium text-body hover:bg-slate-600">
                            <span>Trocar Imagem</span>
                            <input id="logo-upload" name="logo-upload" type="file" className="sr-only" accept="image/png, image/jpeg" onChange={e => handleImageChange(e, 'logoUrl')} />
                        </label>
                        {settings.logoUrl && (
                            <button type="button" onClick={() => handleImageDelete('logoUrl')} className="text-sm text-red-400 hover:text-red-300">Remover</button>
                        )}
                    </div>
                </div>
                 <div>
                    <label htmlFor="logoText" className="block text-sm font-medium text-body">Nome da Marca</label>
                    <input type="text" name="logoText" id="logoText" value={settings.logoText} onChange={handleInputChange} placeholder="Ex: DIGIFOX" className={inputStyles} />
                </div>
                 <div>
                    <label htmlFor="showLogoText" className="flex items-center">
                        <input type="checkbox" id="showLogoText" name="showLogoText" checked={settings.showLogoText} onChange={handleInputChange} className="h-4 w-4 rounded border-slate-500 bg-slate-700 text-cyan-500 focus:ring-cyan-500" />
                        <span className="ml-2 text-sm text-body">Exibir nome ao lado do logo</span>
                    </label>
                </div>
            </>)}
            
            {renderFieldset('Cores e Aparência', <>
                 <div>
                    <label className="block text-sm font-medium text-body mb-2">Imagem de Fundo do Site (Opcional)</label>
                     <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-600 border-dashed rounded-md bg-cover bg-center" style={{backgroundImage: `url(${settings.backgroundImageUrl})`}}>
                        <div className="space-y-1 text-center bg-slate-900 bg-opacity-75 p-4 rounded-md">
                            <PhotoIcon />
                            <div className="flex text-sm text-body items-center justify-center">
                                <label htmlFor="bg-image-upload" className="relative cursor-pointer rounded-md font-medium text-section-title hover:text-cyan-300">
                                    <span>Alterar imagem</span>
                                    <input id="bg-image-upload" name="bg-image-upload" type="file" className="sr-only" accept="image/png, image/jpeg" onChange={e => handleImageChange(e, 'backgroundImageUrl')} />
                                </label>
                                {settings.backgroundImageUrl && (
                                    <button type="button" onClick={() => handleImageDelete('backgroundImageUrl')} className="ml-4 text-red-400 hover:text-red-300">Remover</button>
                                )}
                            </div>
                            <p className="text-xs text-muted">PNG, JPG até 5MB</p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <ColorPicker label="Cor de Fundo do Site" value={settings.backgroundColor} onChange={value => setSettings(s => ({...s, backgroundColor: value}))} />
                   <ColorPicker label="Cor dos Botões" value={settings.buttonColor} onChange={value => setSettings(s => ({...s, buttonColor: value}))} />
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <ColorPicker label="Cor Títulos de Página" value={settings.pageTitleColor} onChange={value => setSettings(s => ({...s, pageTitleColor: value}))} />
                   <ColorPicker label="Cor Títulos de Seção" value={settings.sectionTitleColor} onChange={value => setSettings(s => ({...s, sectionTitleColor: value}))} />
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <ColorPicker label="Cor Texto Principal" value={settings.bodyTextColor} onChange={value => setSettings(s => ({...s, bodyTextColor: value}))} />
                   <ColorPicker label="Cor Texto Secundário" value={settings.bodyTextMutedColor} onChange={value => setSettings(s => ({...s, bodyTextMutedColor: value}))} />
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <ColorPicker label="Cor do Cabeçalho" value={settings.headerBackgroundColor} onChange={value => setSettings(s => ({...s, headerBackgroundColor: value}))} />
                   <ColorPicker label="Cor do Rodapé" value={settings.footerBackgroundColor} onChange={value => setSettings(s => ({...s, footerBackgroundColor: value}))} />
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <ColorPicker label="Cor Texto do Menu" value={settings.headerMenuColor} onChange={value => setSettings(s => ({...s, headerMenuColor: value}))} />
                   <ColorPicker label="Cor Sublinhado do Menu" value={settings.headerMenuHighlightColor} onChange={value => setSettings(s => ({...s, headerMenuHighlightColor: value}))} />
                </div>
            </>)}

            {renderFieldset('Banners Rotativos da Página Inicial', <>
                {settings.heroBanners.map((banner, index) => (
                    <div key={index} className="space-y-4 border-t border-slate-700 pt-4 first:pt-0 first:border-t-0">
                        <h3 className="font-semibold text-page-title">Banner {index + 1}</h3>
                        <div>
                            <label className="block text-sm font-medium text-body mb-2">Imagem do Banner {index + 1}</label>
                            <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-600 border-dashed rounded-md bg-cover bg-center" style={{backgroundImage: `url(${banner.imageUrl})`}}>
                                <div className="space-y-1 text-center bg-slate-900 bg-opacity-75 p-4 rounded-md">
                                    <PhotoIcon />
                                     <div className="flex text-sm text-body items-center justify-center">
                                        <label htmlFor={`hero-upload-${index}`} className="relative cursor-pointer rounded-md font-medium text-section-title hover:text-cyan-300">
                                            <span>Alterar imagem</span>
                                            <input id={`hero-upload-${index}`} name={`hero-upload-${index}`} type="file" className="sr-only" accept="image/png, image/jpeg" onChange={e => handleImageChange(e, `heroBanners.${index}.imageUrl`)} />
                                        </label>
                                        {banner.imageUrl && (
                                            <button type="button" onClick={() => handleImageDelete(`heroBanners.${index}.imageUrl`)} className="ml-4 text-red-400 hover:text-red-300">Remover</button>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted">PNG, JPG até 5MB</p>
                                </div>
                            </div>
                        </div>
                         <div>
                            <label htmlFor={`banner-title-${index}`} className="block text-sm font-medium text-body">Título do Banner {index + 1}</label>
                            <input type="text" id={`banner-title-${index}`} value={banner.title} onChange={(e) => handleBannerChange(index, 'title', e.target.value)} placeholder="Título principal do banner" className={inputStyles} />
                        </div>
                        <div>
                            <label htmlFor={`banner-subtitle-${index}`} className="block text-sm font-medium text-body">Subtítulo do Banner {index + 1}</label>
                            <input type="text" id={`banner-subtitle-${index}`} value={banner.subtitle} onChange={(e) => handleBannerChange(index, 'subtitle', e.target.value)} placeholder="Texto de apoio do banner" className={inputStyles} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor={`banner-title-color-${index}`} className="block text-sm font-medium text-body">Cor do Título</label>
                                <ColorPicker label="" value={banner.titleColor} onChange={value => handleBannerChange(index, 'titleColor', value)} />
                            </div>
                            <div>
                                <label htmlFor={`banner-subtitle-color-${index}`} className="block text-sm font-medium text-body">Cor do Subtítulo</label>
                                <ColorPicker label="" value={banner.subtitleColor} onChange={value => handleBannerChange(index, 'subtitleColor', value)} />
                            </div>
                            <div>
                                <label htmlFor={`banner-font-${index}`} className="block text-sm font-medium text-body">Fonte do Texto</label>
                                <select id={`banner-font-${index}`} value={banner.fontFamily} onChange={(e) => handleBannerChange(index, 'fontFamily', e.target.value)} className={inputStyles}>
                                    {fontOptions.map(font => (
                                        <option key={font.value} value={font.value}>{font.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                ))}
            </>)}

            {renderFieldset('Página Quem Somos', <>
                <div>
                    <label className="block text-sm font-medium text-body mb-2">Imagem da Página</label>
                     <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-600 border-dashed rounded-md bg-cover bg-center" style={{backgroundImage: `url(${settings.aboutPageImageUrl})`}}>
                        <div className="space-y-1 text-center bg-slate-900 bg-opacity-75 p-4 rounded-md">
                            <PhotoIcon />
                            <div className="flex text-sm text-body items-center justify-center">
                                <label htmlFor="about-upload" className="relative cursor-pointer rounded-md font-medium text-section-title hover:text-cyan-300">
                                    <span>Alterar imagem</span>
                                    <input id="about-upload" name="about-upload" type="file" className="sr-only" accept="image/png, image/jpeg" onChange={e => handleImageChange(e, 'aboutPageImageUrl')} />
                                </label>
                                {settings.aboutPageImageUrl && (
                                    <button type="button" onClick={() => handleImageDelete('aboutPageImageUrl')} className="ml-4 text-red-400 hover:text-red-300">Remover</button>
                                )}
                            </div>
                            <p className="text-xs text-muted">PNG, JPG até 5MB</p>
                        </div>
                    </div>
                </div>
                <div>
                    <label htmlFor="aboutPageHistory" className="block text-sm font-medium text-body">Nossa História</label>
                    <textarea id="aboutPageHistory" name="aboutPageHistory" value={settings.aboutPageHistory} onChange={handleInputChange} rows={5} className={inputStyles} />
                </div>
                 <div>
                    <label htmlFor="aboutPageMission" className="block text-sm font-medium text-body">Nossa Missão</label>
                    <textarea id="aboutPageMission" name="aboutPageMission" value={settings.aboutPageMission} onChange={handleInputChange} rows={4} className={inputStyles} />
                </div>
                 <div>
                    <label htmlFor="aboutPageValues" className="block text-sm font-medium text-body">Nossos Valores</label>
                     <textarea id="aboutPageValues" name="aboutPageValues" value={settings.aboutPageValues} onChange={handleInputChange} rows={6} className={inputStyles} />
                     <p className="text-xs text-muted mt-1">Dica: Coloque cada valor em uma nova linha.</p>
                </div>
            </>)}

            {renderFieldset('Informações de Contato e Localização', <>
                 <div>
                    <label htmlFor="companyAddress" className="block text-sm font-medium text-body">Endereço da Imobiliária</label>
                    <input type="text" name="companyAddress" id="companyAddress" value={settings.companyAddress} onChange={handleInputChange} className={inputStyles}/>
                </div>
                <div>
                    <label htmlFor="mapEmbedCode" className="block text-sm font-medium text-body">Código de Incorporação do Mapa</label>
                    <textarea id="mapEmbedCode" name="mapEmbedCode" value={settings.mapEmbedCode} onChange={handleInputChange} rows={4} className={inputStyles} placeholder="Cole o código <iframe> do Google Maps aqui." />
                    <p className="text-xs text-muted mt-1">Obtenha o código em "Compartilhar" &gt; "Incorporar um mapa" no Google Maps.</p>
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div>
                        <label htmlFor="footerContactEmail" className="block text-sm font-medium text-body">E-mail de Contato (Rodapé)</label>
                        <input type="email" name="footerContactEmail" id="footerContactEmail" value={settings.footerContactEmail} onChange={handleInputChange} className={inputStyles}/>
                    </div>
                     <div>
                        <label htmlFor="footerContactPhone" className="block text-sm font-medium text-body">Telefone de Contato (Rodapé)</label>
                        <input type="text" name="footerContactPhone" id="footerContactPhone" value={settings.footerContactPhone} onChange={handleInputChange} className={inputStyles} placeholder="(XX) XXXXX-XXXX" />
                    </div>
                </div>
                <div>
                    <label htmlFor="footerDescription" className="block text-sm font-medium text-body">Descrição do Rodapé</label>
                    <textarea name="footerDescription" id="footerDescription" value={settings.footerDescription} onChange={handleInputChange} rows={2} className={inputStyles} />
                </div>
                <div>
                    <label htmlFor="footerCopyright" className="block text-sm font-medium text-body">Texto de Copyright</label>
                    <input type="text" name="footerCopyright" id="footerCopyright" value={settings.footerCopyright} onChange={handleInputChange} className={inputStyles} />
                </div>
                <div>
                    <label htmlFor="contactFormRecipientEmail" className="block text-sm font-medium text-body">E-mail para Receber Contatos (Página de Contato)</label>
                    <input type="email" name="contactFormRecipientEmail" id="contactFormRecipientEmail" value={settings.contactFormRecipientEmail} onChange={handleInputChange} className={inputStyles}/>
                </div>
                 <div>
                    <label htmlFor="footerFacebookUrl" className="block text-sm font-medium text-body">Link do Facebook</label>
                    <input type="url" name="footerFacebookUrl" id="footerFacebookUrl" value={settings.footerFacebookUrl} onChange={handleInputChange} placeholder="https://facebook.com/seu-perfil" className={inputStyles}/>
                </div>
                 <div>
                    <label htmlFor="footerInstagramUrl" className="block text-sm font-medium text-body">Link do Instagram</label>
                    <input type="url" name="footerInstagramUrl" id="footerInstagramUrl" value={settings.footerInstagramUrl} onChange={handleInputChange} placeholder="https://instagram.com/seu-perfil" className={inputStyles}/>
                </div>
                <div>
                    <label htmlFor="footerLinkedInUrl" className="block text-sm font-medium text-body">Link do LinkedIn</label>
                    <input type="url" name="footerLinkedInUrl" id="footerLinkedInUrl" value={settings.footerLinkedInUrl} onChange={handleInputChange} placeholder="https://linkedin.com/in/seu-perfil" className={inputStyles}/>
                </div>
            </>)}

            <div className="flex flex-col space-y-2 pt-4">
                <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium btn-primary"
                >
                    Salvar Alterações
                </button>
                 <button type="button" onClick={onCancel} className="w-full flex justify-center py-2 px-4 border border-slate-600 rounded-md shadow-sm text-sm font-medium text-body bg-slate-700/50 hover:bg-slate-700">
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