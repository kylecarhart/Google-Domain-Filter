import { useEffect, RefObject } from "react";

/**
 * Listens for a click outside the ref and fires the callback.
 * @param {*} ref - React ref.
 * @param {function} callback
 * @param {boolean} [disabled=false] - Toggle to fire callback.
 */
export default function useOutsideClick<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  callback: (e: MouseEvent) => void,
  disabled = false
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      let element = ref?.current;
      if (element && !element.contains(e.target as HTMLElement) && !disabled) {
        callback(e);
      }
    };

    if (!disabled) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, callback, disabled]);
}
