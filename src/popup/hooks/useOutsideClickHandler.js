import { useEffect } from 'react';

export default function useOutsideClickHandler(ref, isDisabled, callback) {
  useEffect(() => {
    const handleClick = (e) => {
      if (!ref.current.contains(e.target) && !isDisabled) {
        callback();
      }
    };

    if (!isDisabled) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, isDisabled, callback]);
}
