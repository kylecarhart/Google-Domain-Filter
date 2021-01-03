import QueryObserver from "./QueryObserver";
import { removeResults, highlightResults } from "./mutations";
import { FILTER_LIST_KEY, PREFERENCE_LIST_KEY } from "../storage";
import ResultObserver from "./ResultObserver";

const url = new URL(window.location.href);
const params = url.searchParams;
const asQParam = params.get("as_q");
let observer;

// Run the query observer when using the Experimental filter mode
if (asQParam) {
  observer = new QueryObserver(asQParam);
  observer.observe();
}

// Start google domain filtering script
(async function () {
  const storage = await browser.storage.sync.get([
    FILTER_LIST_KEY,
    PREFERENCE_LIST_KEY,
  ]);

  const filterList = storage[FILTER_LIST_KEY] || [];
  const preferenceList = storage[PREFERENCE_LIST_KEY] || [];

  // Run the result observer when using default filter mode
  if (!asQParam) {
    observer = new ResultObserver(filterList);
    observer.observe();
  }

  document.addEventListener("DOMContentLoaded", () => {
    observer.disconnect();
    highlightResults(preferenceList);
  });

  // Listen for changes to filter list and remove them from the DOM
  browser.storage.onChanged.addListener((storage) => {
    if (storage[FILTER_LIST_KEY]) {
      removeResults(storage[FILTER_LIST_KEY].newValue);
    } else if (storage[PREFERENCE_LIST_KEY]) {
      highlightResults(storage[PREFERENCE_LIST_KEY].newValue);
    }
  });
})();
