import React from 'react';

interface MapPlaceholderProps {
  address: string;
}

const MapPlaceholder: React.FC<MapPlaceholderProps> = ({ address }) => {
  // IMPORTANTE: Substitua 'SUA_CHAVE_DE_API_AQUI' pela sua chave de API do Google Maps.
  // Você pode obter uma em: https://cloud.google.com/maps-platform/
  const API_KEY = 'SUA_CHAVE_DE_API_AQUI'; 

  const encodedAddress = encodeURIComponent(address);
  const mapEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${encodedAddress}`;

  if (API_KEY === 'SUA_CHAVE_DE_API_AQUI') {
    return (
      <div className="mt-4 p-4 rounded-lg bg-amber-100 border border-amber-300 text-amber-800 text-sm">
        <p className="font-bold">Ação Necessária: Configurar a Chave de API</p>
        <p>Para exibir o mapa, insira sua chave de API do Google Maps no arquivo <code>components/MapPlaceholder.tsx</code>.</p>
      </div>
    )
  }

  return (
    <div className="mt-4 rounded-lg overflow-hidden border border-slate-200 shadow-inner">
      <iframe
        width="100%"
        height="200"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={mapEmbedUrl}
        title={`Mapa de localização para ${address}`}
        aria-label={`Mapa de localização para ${address}`}
      >
      </iframe>
    </div>
  );
};

export default MapPlaceholder;