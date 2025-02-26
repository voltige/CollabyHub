import { useState, useEffect } from 'react';

export const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  width: number;
}> = ({ src, alt, width }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={`${src}?w=${width}`}
      alt={alt}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      className={`transition-opacity duration-300 ${
        loaded ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
};