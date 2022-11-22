import { useEffect } from "react";

/**
 * Listens for a click outside the ref element and fires the callback.
 */
export default function useOutsideClick<T extends HTMLElement = HTMLElement>(
  refElement: T,
  callback: (e: MouseEvent) => void,
  disabled = false
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        refElement &&
        !refElement.contains(e.target as HTMLElement) &&
        !disabled
      ) {
        callback(e);
      }
    };

    if (!disabled) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [refElement, callback, disabled]);
}
