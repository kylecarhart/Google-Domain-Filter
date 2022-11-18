import QueryObserver from "./QueryObserver";
import { filterResults, preferResults } from "./mutations";
import ResultObserver from "./ResultObserver";
import { storage } from "@/libs/common/storage";

(async function () {
  const url = new URL(window.location.href);
  const asQParam = url.searchParams.get("as_q");
  let observer: QueryObserver | ResultObserver = null;

  // Run the query observer when using the Experimental filter mode
  if (asQParam) {
    observer = new QueryObserver(asQParam);
    observer.observe();
  }

  let filterList = await storage.filterList.get();
  let preferenceList = await storage.preferenceList.get();
  let options = await storage.options.get();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      if (observer) {
        observer.disconnect();
      }

      if (options.preferenceListEnabled) {
        preferResults(preferenceList);
      }

      if (options.filterListEnabled) {
        filterResults(filterList);
      }
    });

    // Run the result observer when using default filter mode
    if (!asQParam && options.filterListEnabled) {
      observer = new ResultObserver(filterList);
      observer.observe();
    }
  } else {
    // Dom is already loaded (possibly due to back/forward navigation)
    if (options.filterListEnabled) {
      filterResults(filterList);
    }

    if (options.preferenceListEnabled) {
      preferResults(preferenceList);
    }
  }

  // Listen for changes to the options (enable/disable)
  storage.options.addListener((newOptions, oldOptions) => {
    // Show/hide filter results when options are changed.
    if (newOptions.filterListEnabled !== oldOptions.filterListEnabled) {
      if (newOptions.filterListEnabled) {
        filterResults(filterList);
      } else {
        filterResults([]);
      }
    }

    // Emphasize/de-emphasize preferences when options are changed.
    if (newOptions.preferenceListEnabled !== oldOptions.preferenceListEnabled) {
      if (newOptions.preferenceListEnabled) {
        preferResults(preferenceList);
      } else {
        preferResults([]);
      }
    }

    options = newOptions;
  });

  // Listen for changes to filter list and remove them from the DOM
  storage.filterList.addListener((newFilterList) => {
    if (options.filterListEnabled) {
      filterResults(newFilterList);
    }
    filterList = newFilterList;
  });

  // Listen to changes to preference list and highlight them in the DOM
  storage.preferenceList.addListener((newPreferenceList) => {
    if (options.preferenceListEnabled) {
      preferResults(newPreferenceList);
    }
    preferenceList = newPreferenceList;
  });
})();
