import QueryObserver from "./QueryObserver";
import { removeResults, highlightResults } from "./mutations";
import ResultObserver from "./ResultObserver";
import storage from "../storage";

const url = new URL(window.location.href);
const params = url.searchParams;
const asQParam = params.get("as_q");
let observer: QueryObserver | ResultObserver = null;

// Run the query observer when using the Experimental filter mode
if (asQParam) {
  observer = new QueryObserver(asQParam);
  observer.observe();
}

// Start google domain filtering script
(async function () {
  let filterList = await storage.filterList.get();
  let preferenceList = await storage.preferenceList.get();
  let options = await storage.options.get();

  // Run the result observer when using default filter mode
  if (!asQParam && options.filterListEnabled) {
    observer = new ResultObserver(filterList);
    observer.observe();
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (observer) {
      observer.disconnect();
    }

    if (options.preferenceListEnabled) {
      highlightResults(preferenceList);
    }

    // Attempt to remove filter results no matter what (for cached pages)
    if (options.filterListEnabled) {
      removeResults(filterList);
    }
  });

  storage.options.addListener((newOptions, oldOptions) => {
    if (newOptions.filterListEnabled !== oldOptions.filterListEnabled) {
      if (newOptions.filterListEnabled) {
        removeResults(filterList);
      } else {
        removeResults([]);
      }
    }

    if (newOptions.preferenceListEnabled !== oldOptions.preferenceListEnabled) {
      if (newOptions.preferenceListEnabled) {
        highlightResults(preferenceList);
      } else {
        highlightResults([]);
      }
    }

    options = newOptions;
  });

  // Listen for changes to filter list and remove them from the DOM
  storage.filterList.addListener((newFilterList) => {
    if (options.filterListEnabled) {
      removeResults(newFilterList);
    }
    filterList = newFilterList;
  });

  storage.preferenceList.addListener((newPreferenceList) => {
    if (options.preferenceListEnabled) {
      highlightResults(newPreferenceList);
    }
    preferenceList = newPreferenceList;
  });
})();
