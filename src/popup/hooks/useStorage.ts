import { useState, useEffect } from "react";
import { getStorage, setStorage } from "../../storage/storageUtils";

/**
 * React hook that automatically retrieves and sets values in
 * storage of specified key.
 * @param {string} key - Key of the storage value to watch.
 * @param {*} defaultValue - Default value (if none found).
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
