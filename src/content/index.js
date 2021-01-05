import QueryObserver from "./QueryObserver";
import { removeResults, highlightResults } from "./mutations";
import ResultObserver from "./ResultObserver";
import storage from "../storage";

const url = new URL(window.location.href);
const params = url.searchParams;
const asQParam = params.get("as_q");
let observer = null;

// Run the query observer when using the Experimental filter mode
if (asQParam) {
  observer = new QueryObserver(asQParam);
  observer.observe();
}

// Start google domain filtering script
(async function () {
  const filterList = await storage.filterList.get();
  const preferenceList = await storage.preferenceList.get();
  const options = await storage.options.get();

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
  });

  // Listen for changes to filter list and remove them from the DOM
  storage.filterList.addListener((filterList) => {
    if (options.filterListEnabled) {
      removeResults(filterList);
    }
  });
  storage.preferenceList.addListener((preferenceList) => {
    if (options.preferenceListEnabled) {
      highlightResults(preferenceList);
    }
  });
})();
