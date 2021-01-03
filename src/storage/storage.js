import { useState, useEffect } from "react";

let listenerMap = new Map();

/**
 * Attempt to retrieve value from storage. If the key does not exist, and
 * defaultValue is specified, defaultValue will be written to storage and
 * returned.
 * @param {string} key - Key of value to retrieve from storage.
 * @param {any=} defaultValue - defaultValue to set if key doesnt exist.
 */
export async function getStorage(key, defaultValue) {
  try {
    const storage = await browser.storage.sync.get(key);
    // Return storage value if the key exists
    if (storage[key]) {
      return storage[key];
    }

    // Storage key doesnt exist, set default value if specified.
    if (defaultValue) {
      setStorage(key, defaultValue);
      return defaultValue;
    }

    return null; // Do default value specified, return null;
  } catch (e) {
    console.log(`[Error in getStorage] ${e.name}: ${e.message}`);
  }
}

/**
 * Set a value in storage for a key.
 * @param {string} key - Key of storage value.
 * @param {*} val - Value to set.
 */
export function setStorage(key, val) {
  try {
    return browser.storage.sync.set({ [key]: val });
  } catch (e) {
    console.log(`[Error in setStorage] ${e.name}: ${e.message}`);
  }
}

/**
 * Add listener to storage based on key.
 * @param {string} key - Key of storage value.
 * @param {function} callback - Function to call if storage value found.
 */
export function addStorageListener(key, callback) {
  const listener = (storage) => {
    if (storage[key]) {
      callback(storage[key].newValue);
    }
  };

  listenerMap.set(callback, listener);
  browser.storage.onChanged.addListener(listener);
}

/**
 * Remove a storage listener based on a callback.
 * @param {function} callback - Callback function to remove from listener.
 */
export function removeStorageListener(callback) {
  const listener = listenerMap.get(callback);
  if (listener) {
    browser.storage.onChanged.removeListener(listener);
    listenerMap.delete(callback);
  }
}

/**
 * React hook that automatically retrieves and sets values in
 * storage of specified key.
 * @param {string} key - Key of the storage value to watch.
 * @param {*} defaultValue - Default value (if none found).
 */

export function useStorage(key, defaultValue) {
  const [storedValue, setStoredValue] = useState(defaultValue);

  // Get value from storage, or defaultValue if doesnt exist.
  useEffect(() => {
    getStorage(key, defaultValue).then((value) => {
      setStoredValue(value);
    });
  }, [key, defaultValue]);

  const setValue = async (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value; // allows for lazy state initialization
      setStoredValue(valueToStore);
      setStorage(key, valueToStore);
    } catch (error) {
      console.log(error);
      setStoredValue(storedValue);
      setStorage(key, value);
    }
  };

  return [storedValue, setValue];
}
