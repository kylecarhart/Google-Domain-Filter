import { StorageListenerOnChanged } from "../../types";
import {
  getStorage,
  setStorage,
  addStorageListener,
  removeStorageListener,
} from "../storageUtils";

export default function daoFactory<T>(key: string, defaultValue: T) {
  /**
   * Get filter list from storage.
   */
  function get() {
    return getStorage(key, defaultValue) as Promise<T>;
  }

  /**
   * Set filter list in storage.
   * @param {[string]} val - Filter list
   */
  function set(val: T) {
    setStorage(key, val);
  }

  /**
   * Set a listener to changes on the filter list in storage.
   * @param {Function} callback - Function to call back.
   */
  function addListener(callback: (newValue: T, oldValue: T) => void) {
    return addStorageListener(key, callback);
  }

  /**
   * Remove specified listener.
   * @param {Function} callback - Function to call back.
   */
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
