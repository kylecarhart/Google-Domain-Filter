import { useEffect, useRef } from "react";

/**
 * Store reference to a previous value.
 */
export default function usePrevious(value: any) {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
