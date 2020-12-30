export const FILTER_LIST_KEY = "filterList";
export const PREFERENCE_LIST_KEY = "preferenceList";

export const OPTIONS_KEY = "options";
export const FILTER_LIST_ENABLED_KEY = "filterListEnabled";
export const PREFERENCE_LIST_ENABLED_KEY = "preferenceListEnabled";

export const FILTER_MODE_EXPERIMENTAL_KEY = "filterModeIsExperimental";

const STORAGE_DEFAULTS = {
  [FILTER_LIST_KEY]: [],
  [PREFERENCE_LIST_KEY]: [],
  [OPTIONS_KEY]: {
    [FILTER_LIST_ENABLED_KEY]: true,
    [PREFERENCE_LIST_ENABLED_KEY]: true,
    [FILTER_MODE_EXPERIMENTAL_KEY]: false,
  },
};

export function initStorage() {
  return browser.storage.sync.set(STORAGE_DEFAULTS);
}
