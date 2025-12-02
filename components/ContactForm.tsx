

import React, { useState } from 'react';
import { Property } from '../types';

interface ContactFormProps {
  property: Property;
  contactPhoneNumber: string;
}

const MailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
);

const WhatsAppIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.654 4.288 1.911 6.045l-1.219 4.443 4.635-1.218zM8.332 9.55c-.275-.465-.552-.465-.823-.465h-.521c-.275 0-.687.136-.687.693 0 .557.412 1.291.469 1.385.057.094.836 1.385 2.331 1.953.376.136.64.204.887.261.246.057.687.027.935-.11.275-.164.687-.81.782-1.012.094-.204.057-.348-.027-.465s-.246-.348-.521-.465c-.275-.118-.552-.164-.823-.164s-.469.118-.687.348c-.219.232-.836.995-.992 1.182s-.314.232-.579.136c-.264-.094-.961-.348-1.822-1.127-.662-.579-1.107-1.291-1.219-1.524z" />
    </svg>
);


const ContactForm: React.FC<ContactFormProps> = ({ property, contactPhoneNumber }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const propertyLink = window.location.href;
    
    let prefilledMessage = `Tenho interesse no imóvel "${property.name}".\nVeja mais detalhes no link: ${propertyLink}`;
    if (property.realtorName) {
        prefilledMessage += `\n\nGostaria de falar com o corretor(a) responsável: ${property.realtorName}.`;
    }

    const handleEmailSubmit = () => {
        const recipient = 'ailtoncomercial@gmail.com';
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
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-slate-700 border-b pb-2 mb-4">Entre em Contato</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-slate-600">Nome</label>
                    <input
                        type="text"
                        id="contact-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Seu nome completo"
                        required
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    />
                </div>
                <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-slate-600">E-mail</label>
                    <input
                        type="email"
                        id="contact-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seuemail@exemplo.com"
                        required
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    />
                </div>
                <div>
                    <label htmlFor="contact-phone" className="block text-sm font-medium text-slate-600">Telefone</label>
                    <input
                        type="tel"
                        id="contact-phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(00) 00000-0000"
                        required
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-600">Mensagem</label>
                    <p className="mt-1 block w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-md text-sm text-slate-600 whitespace-pre-wrap">
                        {prefilledMessage}
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <button
                        onClick={handleEmailSubmit}
                        className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-600 hover:bg-slate-700"
                    >
                        <MailIcon />
                        Enviar E-mail
                    </button>
                    <button
                        onClick={handleWhatsAppSubmit}
                        className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
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
