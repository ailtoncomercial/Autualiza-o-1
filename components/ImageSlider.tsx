import React, { useState } from 'react';
import ImageModal from './ImageModal'; // Importar o novo componente

interface ImageSliderProps {
  urls: string[];
}

const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ArrowRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const ImageSlider: React.FC<ImageSliderProps> = ({ urls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!urls || urls.length === 0) {
    return <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-500">Sem fotos</div>;
  }

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? urls.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === urls.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="relative w-full h-full group">
        <div
          style={{ backgroundImage: `url(${urls[currentIndex]})` }}
          className="w-full h-full bg-center bg-cover duration-500 cursor-pointer"
          onClick={handleOpenModal}
          role="button"
          aria-label="Abrir galeria de imagens"
        ></div>
        
        {/* Left Arrow */}
        {urls.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-50 focus:outline-none"
            aria-label="Foto anterior"
          >
            <ArrowLeftIcon />
          </button>
        )}

        {/* Right Arrow */}
        {urls.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-50 focus:outline-none"
            aria-label="Próxima foto"
          >
            <ArrowRightIcon />
          </button>
        )}

        {/* Counter */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs font-semibold px-2 py-1 rounded-full">
          {currentIndex + 1} / {urls.length}
        </div>
      </div>

      {isModalOpen && (
        <ImageModal 
          urls={urls}
          startIndex={currentIndex}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default ImageSlider;