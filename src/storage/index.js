export const FILTER_LIST_KEY = "filterList";
export const PREFERENCE_LIST_KEY = "preferenceList";

export const OPTIONS_KEY = "options";
export const FILTER_LIST_ENABLED_KEY = "filterListEnabled";
export const PREFERENCE_LIST_ENABLED_KEY = "preferenceListEnabled";

export const FILTER_MODE_DEFAULT_KEY = "filterModeIsDefault";

const STORAGE_DEFAULTS = {
  [FILTER_LIST_KEY]: [],
  [PREFERENCE_LIST_KEY]: [],
  [OPTIONS_KEY]: {
    [FILTER_LIST_ENABLED_KEY]: true,
    [PREFERENCE_LIST_ENABLED_KEY]: true,
    [FILTER_MODE_DEFAULT_KEY]: true,
  },
};

/**
 * Retrieve a value from storage.
 * @param {string} key - Key of value to retrieve from storage.
 */
async function getStorage(key) {
  try {
    const storage = browser.storage.sync.get(key);
    return storage[key];
  } catch (e) {
    console.log(`[Error in getStorage] ${e.name}: ${e.message}`);
  }
}

/**
 * Set a value in storage for a key.
 * @param {string} key - Key of storage value.
 * @param {*} val - Value to set.
 */
function setStorage(key, val) {
  try {
    browser.storage.sync.set({ [key]: val });
  } catch (e) {
    console.log(`[Error in setStorage] ${e.name}: ${e.message}`);
  }
}

export function getFilterList() {
  return getStorage(FILTER_LIST_KEY);
}

export function setFilterList(val) {
  return setStorage(FILTER_LIST_KEY, val);
}

export function getPreferenceList() {
  return getStorage(PREFERENCE_LIST_KEY);
}

export function setPreferenceList(val) {
  return setStorage(PREFERENCE_LIST_KEY, val);
}

export function getOptions() {
  return getStorage(OPTIONS_KEY);
}

export function setOptions(val) {
  return setStorage(OPTIONS_KEY, val);
}

export function getAll() {
  return getStorage(null);
}

export function initStorage() {
  return browser.storage.sync.set(STORAGE_DEFAULTS);
}
