import storage from "../storage";
import { tlds } from "../tlds.json";
import { toExcludeQuery } from "../utils";

let filterList = null;
let isRunning = false;

const changeListener = (_filterList) => {
  filterList = _filterList;
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

/**
 * Start the onBeforeRequest and storage change listeners.
 */
export async function startRequestListener() {
  filterList = filterList || (await storage.filterList.get());

  browser.webRequest.onBeforeRequest.addListener(
    onBeforeRequestListener,
    {
      urls: tlds.map((tld) => `*://*.google.${tld}/search?*`),
      types: ["main_frame"],
    },
    ["blocking"]
  );

  storage.filterList.addListener(changeListener);
  isRunning = true;
}

/**
 * Stop the onBeforeRequest and storage change listeners.
 */
export function stopRequestListener() {
  if (isRunning) {
    storage.filterList.removeListener(changeListener);
    browser.webRequest.onBeforeRequest.removeListener(onBeforeRequestListener);
  }

  isRunning = false;
}
