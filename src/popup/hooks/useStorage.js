import { useState, useEffect } from 'react';

export default function useStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    browser.storage.sync.get(key).then((storage) => {
      if (storage[key]) {
        setStoredValue(storage[key]);
      }
    });
  }, [key]);

  const setValue = async (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value; // allows for lazy state initialization
      setStoredValue(valueToStore);
      await browser.storage.sync.set({ [key]: valueToStore });
    } catch (error) {
      console.log(error);
      setStoredValue(storedValue);
      browser.storage.sync.set({ [key]: value });
    }
  };

  return [storedValue, setValue];
}
