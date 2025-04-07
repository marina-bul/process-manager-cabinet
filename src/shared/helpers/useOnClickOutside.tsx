import { useEffect, type RefObject } from 'react';

export const useOnClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: () => void
) => {
  
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) return;
      handler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handler]);
};
