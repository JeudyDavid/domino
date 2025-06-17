import { useState, useEffect } from 'react';

const useImage = (src) => {
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (!src) {
      setImage(null);
      setStatus('loaded');
      return;
    }

    const img = new Image();
    
    img.onload = () => {
      setImage(img);
      setStatus('loaded');
    };
    
    img.onerror = () => {
      setStatus('error');
    };
    
    img.src = src;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return [image, status];
};

export default useImage;