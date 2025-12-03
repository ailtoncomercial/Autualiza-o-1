import React, { useState, FormEvent } from 'react';
import { SiteSettings } from '../types';

interface ContactPageProps {
  onGoBackToHome: () => void;
  settings: SiteSettings;
}

const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-section-title" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);


const ContactPage: React.FC<ContactPageProps> = ({ onGoBackToHome, settings }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '', 
    phone: '',
    whatsapp: '',
    subject: 'venda',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const inputStyles = "mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-sm shadow-sm placeholder-muted text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500";


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const recipient = settings.contactFormRecipientEmail || 'contato@digifox.com.br';
    const subject = `Contato via Site - Assunto: ${formData.subject === 'venda' ? 'Venda' : 'Locação'}`;
    const body = `
        Um novo contato foi recebido através do formulário do site.

        Nome: ${formData.fullName}
        E-mail: ${formData.email}
        Telefone: ${formData.phone}
        WhatsApp: ${formData.whatsapp || 'Não informado'}
        Assunto: ${formData.subject === 'venda' ? 'Venda' : 'Locação'}

        Mensagem:
        ${formData.message}
    `;

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.trim())}`;
    
    setIsSubmitted(true);
  };

  return (
    <main className="container mx-auto p-4 lg:p-8 animate-fade-in-up">
      <div className="mb-6">
        <button 
            onClick={onGoBackToHome}
            className="flex items-center text-sm font-medium text-section-title hover:opacity-80 transition-colors"
        >
            <ArrowLeftIcon />
            Voltar para a Home
        </button>
      </div>
      
      <div className="max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-2xl shadow-black/20 p-8 md:p-12">
        <h1 className="text-4xl font-bold text-page-title text-center mb-8">Entre em Contato</h1>
        
        {isSubmitted ? (
          <div className="text-center py-12 animate-fade-in-up">
            <CheckCircleIcon className="mx-auto" />
            <h2 className="text-2xl font-semibold text-page-title mt-4">Obrigado pelas informações</h2>
            <p className="text-muted mt-2">Em breve entraremos em contato.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-body">Nome Completo</label>
              <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} required className={inputStyles} />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-body">E-mail</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className={inputStyles} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-body">Telefone</label>
                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} required className={inputStyles} />
              </div>
              <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium text-body">WhatsApp (Opcional)</label>
                <input type="tel" name="whatsapp" id="whatsapp" value={formData.whatsapp} onChange={handleChange} className={inputStyles} />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-body">Assunto</label>
              <select name="subject" id="subject" value={formData.subject} onChange={handleChange} className={inputStyles}>
                <option value="venda">Venda</option>
                <option value="locacao">Locação</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-body">Mensagem</label>
              <textarea name="message" id="message" value={formData.message} onChange={handleChange} rows={5} required className={inputStyles} />
            </div>

            <div className="pt-2">
              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium btn-primary">
                Enviar Mensagem
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
};

export default ContactPage;