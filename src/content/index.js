import { toExcludeQuery } from "../utils";
import { Observer } from "./Observer";
import {
  removeFromInput,
  removeFromTitle,
  removeDomainsFromResults,
} from "./mutations";

// Start google domain filtering script
(async function () {
  const storage = await browser.storage.sync.get("filterList");
  const filterList = storage.filterList || [];

  if (filterList.length === 0) {
    return; // No domains to filter, break out early.
  }

  const filterString = toExcludeQuery(...filterList);

  // Mutate google search as the DOM builds
  const observer = new Observer(filterString);
  observer.observe();

  document.addEventListener("DOMContentLoaded", () => {
    observer.disconnect();
  });

  removeFromTitle(` ${filterString}`);
  removeFromInput(filterString);

  // Listen for changes to domains and remove them from the DOM
  browser.storage.onChanged.addListener((storage) => {
    let filterList = storage.filterList ? storage.filterList.newValue : [];
    removeDomainsFromResults(filterList);
  });
})();
