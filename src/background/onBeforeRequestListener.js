import { FILTER_LIST_KEY } from "../storage";
import { tlds } from "../tlds.json";
import { toExcludeQuery } from "../utils";

let filterList = null;
let isRunning = false;

const changeListener = (storage) => {
  if (storage[FILTER_LIST_KEY]) {
    filterList = storage[FILTER_LIST_KEY].newValue;
  }
};

const onBeforeRequestListener = (details) => {
  // If there are no domains, don't bother redirecting
  if (!filterList && filterList.length === 0) {
    return;
  }

  const url = new URL(details.url);
  const params = url.searchParams;
  const filterString = toExcludeQuery(...filterList);

  // Add the sites to the query if it doesn't contain them already
  if (!params.get("as_q")) {
    params.set("as_q", filterString);
  } else {
    return;
  }

  return {
    redirectUrl: url.toString(), // Redirect
  };
};

const initFilterList = async () => {
  const storage = await browser.storage.sync.get(FILTER_LIST_KEY);
  filterList = storage[FILTER_LIST_KEY];
  return filterList;
};

/**
 * Start the onBeforeRequest and storage change listeners.
 */
export async function startRequestListener() {
  filterList = filterList || (await initFilterList());

  browser.webRequest.onBeforeRequest.addListener(
    onBeforeRequestListener,
    {
      urls: tlds.map((tld) => `*://*.google.${tld}/search?*`),
      types: ["main_frame"],
    },
    ["blocking"]
  );

  browser.storage.onChanged.addListener(changeListener);
  isRunning = true;
}

/**
 * Stop the onBeforeRequest and storage change listeners.
 */
export function stopRequestListener() {
  if (isRunning) {
    browser.storage.onChanged.removeListener(changeListener);
    browser.webRequest.onBeforeRequest.removeListener(onBeforeRequestListener);
  }

  isRunning = false;
}
