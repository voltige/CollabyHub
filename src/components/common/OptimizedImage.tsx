import React from 'react';
import { useInView } from 'react-intersection-observer';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  sizes?: string;
}

export const OptimizedImage: React.FC<ImageProps> = ({ src, alt, sizes, ...props }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '50px 0px'
  });

  return (
    <div ref={ref}>
      {inView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          sizes={sizes}
          {...props}
        />
      )}
    </div>
  );
};