import { useEffect, useRef } from "react";

/**
 * Store reference to a previous value.
 * @param {*} value - Value to track.
 */
function usePrevious(value) {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default usePrevious;
