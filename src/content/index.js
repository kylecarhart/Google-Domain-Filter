import { toExcludeQuery } from "../utils";
import { Observer } from "./Observer";
import {
  removeFromInput,
  removeFromTitle,
  removeResults,
  highlightResults,
} from "./mutations";

// Start google domain filtering script
(async function () {
  const storage = await browser.storage.sync.get();

  const filterList = storage.filterList || [];
  const preferenceList = storage.preferenceList || [];

  if (filterList.length !== 0) {
    const filterString = toExcludeQuery(...filterList);

    // Mutate google search as the DOM builds
    const observer = new Observer(filterString);
    observer.observe();

    document.addEventListener("DOMContentLoaded", () => {
      observer.disconnect();
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
    if (storage.filterList) {
      removeResults(storage.filterList.newValue);
    }
  });

  // Listen for changes to domains and remove them from the DOM
  browser.storage.onChanged.addListener((storage) => {
    if (storage.preferenceList) {
      highlightResults(storage.preferenceList.newValue);
    }
  });
})();
