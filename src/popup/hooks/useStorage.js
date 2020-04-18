import { useState, useEffect } from 'react';
import { get, set } from '../../StorageAPI';

/*
 * Hook for persisting data to chrome storage
 * @param {string} key
 * @param {*} initialValue
 */
export default function useStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    get(key).then((res) => {
      if (res[key]) {
        setStoredValue(res[key]);
      }
    });
  }, [key]);

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value; // allows for lazy state initialization
      setStoredValue(valueToStore);
      set({ [key]: valueToStore });
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
