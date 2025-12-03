import React, { useState } from 'react';
import { Property, SiteSettings } from '../types';

interface ContactFormProps {
  property: Property;
  contactPhoneNumber: string;
  settings: SiteSettings;
}

const MailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
);

const WhatsAppIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.77.46 3.45 1.28 4.95L2 22l5.25-1.38c1.45.77 3.06 1.18 4.75 1.18h.04c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.89-9.91-9.89zM17.16 15.3c-.22-.11-1.3-.64-1.5-.72s-.35-.11-.49.11c-.15.22-.57.72-.7 1.06-.13.15-.26.17-.49.06-.23-.11-1-.37-1.89-1.17-.7-.64-1.17-1.44-1.3-1.69s-.03-.22.08-.33c.1-.11.22-.26.33-.39.11-.13.15-.22.22-.37.08-.15.04-.26-.01-.37-.06-.11-.49-1.17-.68-1.61-.18-.43-.36-.37-.49-.37h-.45c-.14 0-.35.04-.53.22s-.68.66-.68 1.61c0 .95.7 1.87 1.06 2.37.11.15 1.34 2.05 3.25 2.87.43.18.77.29 1.04.37.52.17.98.15 1.36.09.43-.06 1.3-.53 1.48-1.04.18-.51.18-.95.13-1.04-.05-.1-.18-.16-.4-.27z"/>
    </svg>
);


const ContactForm: React.FC<ContactFormProps> = ({ property, contactPhoneNumber, settings }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    
    const inputStyles = "mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-sm shadow-sm placeholder-muted text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500";

    const propertyLink = window.location.href;
    
    let prefilledMessage = `Tenho interesse no imóvel "${property.name}".\nVeja mais detalhes no link: ${propertyLink}`;
    if (property.realtorName) {
        prefilledMessage += `\n\nGostaria de falar com o corretor(a) responsável: ${property.realtorName}.`;
    }

    const handleEmailSubmit = () => {
        const recipient = settings.contactFormRecipientEmail || 'ailtoncomercial@gmail.com';
        const subject = `Interesse no imóvel: ${property.name}`;
        const body = `Nome: ${name}\nEmail: ${email}\nTelefone: ${phone}\n\n${prefilledMessage}`;
        window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const handleWhatsAppSubmit = () => {
        const number = contactPhoneNumber;
        const message = `Nome: ${name}\nEmail: ${email}\nTelefone: ${phone}\n\n${prefilledMessage}`;
        window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-2xl shadow-black/20 p-6">
            <h2 className="text-xl font-semibold text-section-title border-b border-slate-700 pb-3 mb-4">Entre em Contato</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-body">Nome</label>
                    <input
                        type="text"
                        id="contact-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Seu nome completo"
                        required
                        className={inputStyles}
                    />
                </div>
                <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-body">E-mail</label>
                    <input
                        type="email"
                        id="contact-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seuemail@exemplo.com"
                        required
                        className={inputStyles}
                    />
                </div>
                <div>
                    <label htmlFor="contact-phone" className="block text-sm font-medium text-body">Telefone</label>
                    <input
                        type="tel"
                        id="contact-phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(00) 00000-0000"
                        required
                        className={inputStyles}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-body">Mensagem</label>
                    <p className="mt-1 block w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-md text-sm text-body whitespace-pre-wrap break-words">
                        {prefilledMessage}
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <button
                        onClick={handleEmailSubmit}
                        className="w-full flex items-center justify-center py-2 px-4 border border-slate-600 rounded-md shadow-sm text-sm font-medium text-body bg-slate-700/50 hover:bg-slate-700"
                    >
                        <MailIcon />
                        Enviar E-mail
                    </button>
                    <button
                        onClick={handleWhatsAppSubmit}
                        className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600/80 hover:bg-green-600"
                    >
                        <WhatsAppIcon />
                        Enviar via WhatsApp
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;