import { FILTER_LIST_KEY } from "../storage";
import { tlds } from "../tlds.json";
import { toExcludeQuery } from "../utils";

let changeListener;
let onBeforeRequestListener;

/**
 * Handles redirecting google queries based on the filter list.
 */
export async function initRequestListener() {
  const storage = await browser.storage.sync.get(FILTER_LIST_KEY);
  let filterList = storage[FILTER_LIST_KEY] || []; // default to empty array

  // Update domains when storage domains change
  changeListener = (storage) => {
    if (storage[FILTER_LIST_KEY]) {
      filterList = storage[FILTER_LIST_KEY].newValue;
    }
  };

  browser.storage.onChanged.addListener(changeListener);

  // Listen for google requests and redirect
  onBeforeRequestListener = (details) => {
    // If there are no domains, don't bother redirecting
    if (filterList.length === 0) {
      return;
    }

    const url = new URL(details.url);
    const params = url.searchParams;
    const filterString = toExcludeQuery(...filterList);

    // Add the sites to the query if it doesn't contain them already
    // This avoids the infinite request loop.
    if (!filterList.every((domain) => params.get("q").includes(domain))) {
      params.set("q", `${params.get("q")} ${filterString}`);
    } else {
      return;
    }

    return {
      redirectUrl: url.toString(), // Redirect
    };
  };

  browser.webRequest.onBeforeRequest.addListener(
    onBeforeRequestListener,
    {
      urls: tlds.map((tld) => `*://*.google.${tld}/search?*`),
      types: ["main_frame"],
    },
    ["blocking"]
  );
}

export function removeRequestListener() {
  browser.storage.onChanged.removeListener(changeListener);
  browser.webRequest.onBeforeRequest.removeListener(onBeforeRequestListener);
}
