import { useState, useEffect } from 'react';

export default function useStorage(
  key: string,
  initialValue: any
): [any, Function] {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    browser.storage.sync.get(key).then((storage) => {
      if (storage[key]) {
        setStoredValue(storage[key]);
      }
    });
  }, [key]);

  const setValue = async (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value; // allows for lazy state initialization
      await browser.storage.sync.set({ [key]: valueToStore });
      setStoredValue(valueToStore);
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
