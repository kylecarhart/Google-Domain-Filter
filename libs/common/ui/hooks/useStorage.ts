import { useEffect, useState } from "react";
import { getStorage, setStorage } from "@utils/storage.util";

/**
 * React hook that automatically retrieves and sets values in
 * storage of specified key.
 */
export default function useStorage<T>(key: string, defaultValue: T) {
  const [storedValue, setStoredValue] = useState(defaultValue);

  // Get value from storage, or defaultValue if doesnt exist.
  useEffect(() => {
    getStorage(key, defaultValue).then((value) => {
      setStoredValue(value);
    });
  }, [key, defaultValue]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value; // allows for lazy state initialization
      setStoredValue(valueToStore);
      setStorage(key, valueToStore);
    } catch (e) {
      console.log(e);
      setStoredValue(storedValue);
      setStorage(key, storedValue);

      throw e;
    }
  };

  return [storedValue, setValue] as const;
}
