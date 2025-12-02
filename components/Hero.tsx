import React from 'react';

interface HeroProps {
    children: React.ReactNode;
    imageUrl: string;
}

const Hero: React.FC<HeroProps> = ({ children, imageUrl }) => {
    return (
        <div 
            className="relative bg-cover bg-center h-[50vh] min-h-[400px] flex items-center justify-center text-white"
            style={{ backgroundImage: `url(${imageUrl})` }}
        >
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="relative z-10 text-center w-full max-w-4xl mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg mb-4">
                    Encontre o Imóvel dos Seus Sonhos
                </h1>
                <p className="text-lg md:text-xl drop-shadow-md mb-8">
                    A sua busca pelo lugar perfeito começa aqui.
                </p>
                {children}
            </div>
        </div>
    );
};

export default Hero;