import { useEffect } from 'react';

export default function useOutsideClick(ref, callback, disabled = false) {
  useEffect(() => {
    let element = ref;

    if (element && element.current) {
      element = element.current;
    }

    const handleClick = (e) => {
      if (element && !element.contains(e.target) && !disabled) {
        callback();
      }
    };

    if (!disabled) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, callback, disabled]);
}
