import {
  addStorageListener,
  getStorage,
  removeStorageListener,
  setStorage,
  useStorage,
} from "./storage";

export const FILTER_LIST_KEY = "filterList";
export const defaultValue = [];

/**
 * Get filter list from storage.
 */
export function get() {
  return getStorage(FILTER_LIST_KEY, defaultValue);
}

/**
 * Set filter list in storage.
 * @param {[string]} val - Filter list array.
 */
export function set(val) {
  return setStorage(FILTER_LIST_KEY, val);
}

/**
 * Set a listener to changes on the filter list in storage.
 * @param {Function} callback - Function to call back.
 */
export function addListener(callback) {
  addStorageListener(FILTER_LIST_KEY, callback);
}

/**
 * Remove specified listener.
 * @param {Function} callback - Function to call back.
 */
export function removeListener(callback) {
  removeStorageListener(callback);
}

/**
 * Use a react hook to listen for object changes.
 */
export const useHook = useStorage.bind(null, FILTER_LIST_KEY, defaultValue);
