

import React, { useState, useEffect } from 'react';
import { HeroBanner } from '../types';
import Header from './Header';

interface HeroProps {
    children: React.ReactNode;
    banners: HeroBanner[];
    isAuthenticated: boolean;
    logoUrl: string;
    logoText: string;
    showLogoText: boolean;
    onLogout: () => void;
    onAdminClick: () => void;
    onLogoClick: () => void;
    onNavigateToAbout: () => void;
    onNavigateToContact: () => void;
    onNavigateToLocation: () => void;
    headerBackgroundColor: string;
    headerMenuColor: string;
    headerMenuHighlightColor: string;
}

const Hero: React.FC<HeroProps> = ({ 
    children, 
    banners,
    isAuthenticated,
    logoUrl,
    logoText,
    showLogoText,
    onLogout,
    onAdminClick,
    onLogoClick,
    onNavigateToAbout,
    onNavigateToContact,
    onNavigateToLocation,
    headerBackgroundColor,
    headerMenuColor,
    headerMenuHighlightColor,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (banners.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 5000); // Rotação a cada 5 segundos

        return () => clearInterval(timer);
    }, [banners.length]);

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    const headerElement = (
        <div className="absolute top-0 left-0 w-full z-20">
            <Header
                isAuthenticated={isAuthenticated}
                logoUrl={logoUrl}
                logoText={logoText}
                showLogoText={showLogoText}
                backgroundColor={headerBackgroundColor}
                menuColor={headerMenuColor}
                menuHighlightColor={headerMenuHighlightColor}
                onLogout={onLogout}
                onAdminClick={onAdminClick}
                onLogoClick={onLogoClick}
                onNavigateToAbout={onNavigateToAbout}
                onNavigateToContact={onNavigateToContact}
                onNavigateToLocation={onNavigateToLocation}
            />
        </div>
    );

    if (!banners || banners.length === 0) {
        return (
            <div className="relative bg-slate-800 h-[60vh] min-h-[500px] flex flex-col justify-center text-white">
                {headerElement}
                <div className="relative z-10 text-center w-full max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg mb-4">
                        Bem-vindo
                    </h1>
                    <p className="text-lg md:text-xl drop-shadow-md mb-8">
                        Configure os banners na área administrativa.
                    </p>
                    {children}
                </div>
            </div>
        );
    }
    
    const currentBanner = banners[currentIndex];

    return (
        <div 
            className="relative h-[60vh] min-h-[500px] flex flex-col justify-center text-white overflow-hidden"
        >
            {headerElement}
            {/* Imagens do Slider */}
            {banners.map((banner, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 bg-cover bg-center bg-slate-800 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
                    style={{ 
                        backgroundImage: banner.imageUrl ? `url(${banner.imageUrl})` : 'none',
                        transition: 'opacity 1s ease-in-out, transform 8s ease-in-out' 
                    }}
                />
            ))}
            
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-slate-900/20"></div>
            
            <div className="relative z-10 text-center w-full max-w-4xl mx-auto px-4">
                <div key={currentIndex} className="animate-fade-in-up text-center">
                    <h1 
                        className="text-2xl sm:text-3xl lg:text-4xl font-extrabold drop-shadow-lg mb-4"
                        style={{ color: currentBanner.titleColor, fontFamily: currentBanner.fontFamily }}
                    >
                        {currentBanner.title}
                    </h1>
                    <p 
                        className="text-base sm:text-lg lg:text-xl drop-shadow-md mb-8"
                        style={{ color: currentBanner.subtitleColor, fontFamily: currentBanner.fontFamily }}
                    >
                        {currentBanner.subtitle}
                    </p>
                </div>
                {children}
            </div>

            {banners.length > 1 && (
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex space-x-3">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white'}`}
                            aria-label={`Ir para o slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Hero;