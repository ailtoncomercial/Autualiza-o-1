import React from 'react';

interface Photo360ViewerProps {
  url: string;
}

const Photo360Viewer: React.FC<Photo360ViewerProps> = ({ url }) => {
  return (
    <div className="relative w-full overflow-hidden" style={{ paddingTop: '56.25%' }}> {/* Proporção de 16:9 */}
      <iframe
        src={url}
        className="absolute top-0 left-0 w-full h-full"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Tour Virtual 360° do Imóvel"
      ></iframe>
    </div>
  );
};

export default Photo360Viewer;
