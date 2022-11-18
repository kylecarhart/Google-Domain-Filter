import { browser } from "webextension-polyfill-ts";
import { Storage } from "webextension-polyfill-ts";

export type StorageCallback = (newValue: any, oldValue: any) => void;
export type StorageListenerOnChanged = (
  changes: {
    [s: string]: Storage.StorageChange;
  },
  areaName: string
) => void;

/**
 * Attempt to retrieve value from storage. If the key does not exist, and
 * defaultValue is specified, defaultValue will be written to storage and
 * returned.
 */
export async function getStorage(key: string, defaultValue?: any) {
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
    throw e;
  }
}

/**
 * Set a value in storage for a key.
 */
export function setStorage(key: string, val: any) {
  try {
    return browser.storage.sync.set({ [key]: val });
  } catch (e) {
    console.log(`[Error in setStorage] ${e.name}: ${e.message}`);
    throw e;
  }
}

/**
 * Add listener to storage based on key.
 */
export function addStorageListener(key: string, callback: StorageCallback) {
  const listener: StorageListenerOnChanged = (storage) => {
    if (storage[key]) {
      callback(storage[key].newValue, storage[key].oldValue);
    }
  };

  browser.storage.onChanged.addListener(listener);
  return listener;
}

/**
 * Remove a storage listener based on a callback.
 */
export function removeStorageListener(listener: StorageListenerOnChanged) {
  browser.storage.onChanged.removeListener(listener);
}

/**
 * Create a storage service with a key and default value
 */
export function storageFactory<T>(key: string, defaultValue: T) {
  function get() {
    return getStorage(key, defaultValue) as Promise<T>;
  }

  function set(val: T) {
    setStorage(key, val);
  }

  function addListener(callback: (newValue: T, oldValue: T) => void) {
    return addStorageListener(key, callback);
  }

  function removeListener(listener: StorageListenerOnChanged) {
    removeStorageListener(listener);
  }

  return {
    key,
    defaultValue,
    get,
    set,
    addListener,
    removeListener,
  };
}
