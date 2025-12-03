import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';

interface ImageModalProps {
  urls: string[];
  startIndex: number;
  onClose: () => void;
}

const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ArrowRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);


const ImageModal: React.FC<ImageModalProps> = ({ urls, startIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const goToPrevious = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? urls.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, urls]);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === urls.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, urls]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, goToPrevious, goToNext]);

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-up"
      style={{ animationDuration: '0.3s' }}
      onClick={onClose}
    >
      <div className="relative w-full h-full max-w-[90vw] max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <img 
          src={urls[currentIndex]} 
          alt={`Imagem ${currentIndex + 1}`}
          className="w-full h-full object-contain"
        />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
          aria-label="Fechar galeria"
        >
          <CloseIcon />
        </button>

        {urls.length > 1 && (
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-4 -translate-y-1/2 text-white/70 p-2 rounded-full hover:bg-white/10 hover:text-white transition-all"
            aria-label="Imagem anterior"
          >
            <ArrowLeftIcon />
          </button>
        )}

        {urls.length > 1 && (
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-white/70 p-2 rounded-full hover:bg-white/10 hover:text-white transition-all"
            aria-label="Próxima imagem"
          >
            <ArrowRightIcon />
          </button>
        )}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
            {currentIndex + 1} / {urls.length}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ImageModal;