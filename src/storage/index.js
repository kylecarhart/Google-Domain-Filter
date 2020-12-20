const FILTER_LIST_KEY = "filterList";
const PREFERENCE_LIST_KEY = "preferenceList";

const STORAGE_DEFAULTS = {
  [FILTER_LIST_KEY]: [],
  [PREFERENCE_LIST_KEY]: [],
};

function initStorage() {
  return browser.storage.sync.set(STORAGE_DEFAULTS);
}

export { FILTER_LIST_KEY, PREFERENCE_LIST_KEY, initStorage };
