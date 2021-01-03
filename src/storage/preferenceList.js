import {
  addStorageListener,
  getStorage,
  removeStorageListener,
  setStorage,
  useStorage,
} from "./storage";

export const PREFERENCE_LIST_KEY = "preferenceList";
export const defaultValue = [];

/**
 * Get preference list from storage.
 */
export function get() {
  return getStorage(PREFERENCE_LIST_KEY, defaultValue);
}

/**
 * Set preference list in storage.
 * @param {[string]} val - Preference list array.
 */
export function set(val) {
  return setStorage(PREFERENCE_LIST_KEY, val);
}

/**
 * Set a listener to changes on the preference list in storage.
 * @param {Function} callback - Function to call back.
 */
export function addListener(callback) {
  addStorageListener(PREFERENCE_LIST_KEY, callback);
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
export const useHook = useStorage.bind(null, PREFERENCE_LIST_KEY, defaultValue);
