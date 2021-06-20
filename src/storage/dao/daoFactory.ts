import {
  getStorage,
  setStorage,
  addStorageListener,
  removeStorageListener,
  StorageCallback,
} from "../storageUtils";

export default function daoFactory<T>(key: string, defaultValue: T) {
  /**
   * Get filter list from storage.
   */
  function get() {
    return getStorage(key, defaultValue);
  }

  /**
   * Set filter list in storage.
   * @param {[string]} val - Filter list
   */
  function set(val: T) {
    return setStorage(key, val);
  }

  /**
   * Set a listener to changes on the filter list in storage.
   * @param {Function} callback - Function to call back.
   */
  function addListener(callback: StorageCallback<T>) {
    addStorageListener(key, callback);
  }

  /**
   * Remove specified listener.
   * @param {Function} callback - Function to call back.
   */
  function removeListener(callback: StorageCallback<T>) {
    removeStorageListener(callback);
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
