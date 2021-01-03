import * as filterList from "./filterList";
import * as preferenceList from "./preferenceList";
import * as options from "./options";

export function getAll() {
  return browser.storage.sync.get(null);
}

export function init() {
  // Set defaults
  return browser.storage.sync.set({
    filterList: filterList.defaultValue,
    preferenceList: preferenceList.defaultValue,
    options: options.defaultValue,
  });
}

export {
  filterList as filterListStorage,
  preferenceList as preferenceListStorage,
  options as optionsStorage,
};

const storage = {
  filterList,
  preferenceList,
  options,
  getAll,
  init,
};

export default storage;
