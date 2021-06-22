import { browser } from "webextension-polyfill-ts";

let listenerMap = new Map();

export type StorageCallback<T> = (newValue?: T, oldValue?: T) => void;

/**
 * Attempt to retrieve value from storage. If the key does not exist, and
 * defaultValue is specified, defaultValue will be written to storage and
 * returned.
 * @param {string} key - Key of value to retrieve from storage.
 * @param {any=} defaultValue - defaultValue to set if key doesnt exist.
 */
async function getStorage<T>(key: string, defaultValue?: T) {
  try {
    const storage = await browser.storage.sync.get(key);
    // Return storage value if the key exists
    if (storage[key]) {
      return storage[key] as T;
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
function setStorage<T>(key: string, val: T) {
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
function addStorageListener<T>(key: string, callback: StorageCallback<T>) {
  const listener = (storage: Storage) => {
    if (storage[key]) {
      callback(storage[key].newValue, storage[key].oldValue);
    }
  };

  listenerMap.set(callback, listener);
  browser.storage.onChanged.addListener(listener);
}

/**
 * Remove a storage listener based on a callback.
 * @param {function} callback - Callback function to remove from listener.
 */
function removeStorageListener<T>(callback: StorageCallback<T>) {
  const listener = listenerMap.get(callback);
  if (listener) {
    browser.storage.onChanged.removeListener(listener);
    listenerMap.delete(callback);
  }
}

export { getStorage, setStorage, addStorageListener, removeStorageListener };
