import { useEffect, useState } from 'react';
export const useCheckIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const cb = () => {
      setIsMobile(document.body.clientWidth < 1025);
    };
    cb();
    window.addEventListener('resize', cb);

    return () => {
      window.removeEventListener('resize', cb);
    };
  }, []);
  return isMobile;
};
