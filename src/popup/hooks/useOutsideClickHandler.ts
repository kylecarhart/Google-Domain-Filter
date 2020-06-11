import { useEffect } from 'react';

export default function useOutsideClickHandler(
  ref,
  disabled: boolean,
  callback: Function
) {
  useEffect(() => {
    const handleClick = (e) => {
      if (!ref.current.contains(e.target) && !disabled) {
        callback();
      }
    };

    if (!disabled) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, disabled, callback]);
}
