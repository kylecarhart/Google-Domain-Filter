import { useEffect } from 'react';

/**
 * Listens for a click outside the ref and fires the callback.
 * @param {*} ref - React ref.
 * @param {function} callback
 * @param {boolean} [disabled=false] - Toggle to fire callback.
 */
function useOutsideClick(ref, callback, disabled = false) {
  useEffect(() => {
    let element = ref;

    if (element && element.current) {
      element = element.current;
    }

    const handleClick = (e) => {
      if (element && !element.contains(e.target) && !disabled) {
        callback(e);
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

export { useOutsideClick };
