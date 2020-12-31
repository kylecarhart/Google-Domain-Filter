import { toExcludeQuery } from "../utils";
import { Observer } from "./Observer";
import {
  removeFromInput,
  removeFromTitle,
  removeResults,
  highlightResults,
} from "./mutations";
import {
  FILTER_LIST_KEY,
  OPTIONS_KEY,
  PREFERENCE_LIST_KEY,
  FILTER_MODE_DEFAULT_KEY,
} from "../storage";

// Start google domain filtering script
(async function () {
  const storage = await browser.storage.sync.get([
    FILTER_LIST_KEY,
    PREFERENCE_LIST_KEY,
    OPTIONS_KEY,
  ]);

  const filterList = storage[FILTER_LIST_KEY] || [];
  const preferenceList = storage[PREFERENCE_LIST_KEY] || [];
  const options = storage[OPTIONS_KEY] || {};

  if (filterList.length !== 0) {
    const filterString = toExcludeQuery(...filterList);

    // Mutate google search as the DOM builds
    const observer = new Observer(filterString);
    observer.observe();

    document.addEventListener("DOMContentLoaded", () => {
      observer.disconnect();
      removeFromInput(filterString);
      if (options[FILTER_MODE_DEFAULT_KEY]) {
        removeResults(filterList);
      }
    });

    removeFromTitle(` ${filterString}`);
    removeFromInput(filterString);
  }

  // Highlight search results when all DOM content is loaded
  if (preferenceList.length !== 0) {
    document.addEventListener("DOMContentLoaded", () => {
      highlightResults(preferenceList);
    });
  }

  // Listen for changes to domains and remove them from the DOM
  browser.storage.onChanged.addListener((storage) => {
    if (storage[FILTER_LIST_KEY]) {
      removeResults(storage[FILTER_LIST_KEY].newValue);
    }
  });

  // Listen for changes to domains and remove them from the DOM
  browser.storage.onChanged.addListener((storage) => {
    if (storage[PREFERENCE_LIST_KEY]) {
      highlightResults(storage[PREFERENCE_LIST_KEY].newValue);
    }
  });
})();
