import { browser } from "webextension-polyfill-ts";
import { StorageCallback, StorageListenerOnChanged } from "@globalTypes";

/**
 * Attempt to retrieve value from storage. If the key does not exist, and
 * defaultValue is specified, defaultValue will be written to storage and
 * returned.
 * @param {string} key - Key of value to retrieve from storage.
 * @param {any=} defaultValue - defaultValue to set if key doesnt exist.
 */
async function getStorage(key: string, defaultValue?: any) {
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
 * @param {string} key - Key of storage value.
 * @param {*} val - Value to set.
 */
function setStorage(key: string, val: any) {
  try {
    return browser.storage.sync.set({ [key]: val });
  } catch (e) {
    console.log(`[Error in setStorage] ${e.name}: ${e.message}`);
    throw e;
  }
}

/**
 * Add listener to storage based on key.
 * @param {string} key - Key of storage value.
 * @param {function} callback - Function to call if storage value found.
 */
function addStorageListener(key: string, callback: StorageCallback) {
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
 * @param {function} callback - Callback function to remove from listener.
 */
function removeStorageListener(listener: StorageListenerOnChanged) {
  browser.storage.onChanged.removeListener(listener);
}

export { getStorage, setStorage, addStorageListener, removeStorageListener };
