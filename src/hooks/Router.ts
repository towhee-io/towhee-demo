import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function useRouterScroll() {
  const router = useRouter();
  useEffect(() => {
    const handler = () => {
      window.scrollTo(0, 0);
    };
    router.events.on('routeChangeComplete', handler);
    return () => {
      router.events.off('routeChangeComplete', handler);
    };
  });
}
