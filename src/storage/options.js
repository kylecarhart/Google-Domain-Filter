import {
  addStorageListener,
  getStorage,
  removeStorageListener,
  setStorage,
  useStorage,
} from "./storage";

export const OPTIONS_KEY = "options";
export const FILTER_LIST_ENABLED_KEY = "filterListEnabled";
export const PREFERENCE_LIST_ENABLED_KEY = "preferenceListEnabled";
export const FILTER_MODE_DEFAULT_KEY = "filterMode";

export const defaultValue = {
  [FILTER_LIST_ENABLED_KEY]: true,
  [PREFERENCE_LIST_ENABLED_KEY]: true,
  [FILTER_MODE_DEFAULT_KEY]: true,
};

/**
 * Get options from storage.
 */
export function get() {
  return getStorage(OPTIONS_KEY, defaultValue);
}

/**
 * Set options in storage.
 * @param {Object} val - Options object.
 */
export function set(val) {
  return setStorage(OPTIONS_KEY, val);
}

/**
 * Set a listener to changes on the options object in storage.
 * @param {Function} callback - Function to call back.
 */
export function addListener(callback) {
  addStorageListener(OPTIONS_KEY, callback);
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
export const useHook = useStorage.bind(null, OPTIONS_KEY, defaultValue);
