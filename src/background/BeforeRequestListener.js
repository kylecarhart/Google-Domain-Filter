import { FILTER_LIST_KEY } from "../storage";
import { tlds } from "../tlds.json";
import { toExcludeQuery } from "../utils";

export default class BeforeRequestListener {
  constructor(filterList = []) {
    this.filterList = filterList;

    this.changeListener = (storage) => {
      if (storage[FILTER_LIST_KEY]) {
        this.filterList = storage[FILTER_LIST_KEY].newValue;
      }
    };

    this.onBeforeRequestListener = (details) => {
      // If there are no domains, don't bother redirecting
      if (this.filterList.length === 0) {
        return;
      }

      const url = new URL(details.url);
      const params = url.searchParams;
      const filterString = toExcludeQuery(...this.filterList);

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
  }

  startChangeListener() {
    browser.storage.onChanged.addListener(this.changeListener);
  }

  stopChangeListener() {
    browser.storage.onChanged.removeListener(this.changeListener);
  }

  startRequestListener() {
    browser.webRequest.onBeforeRequest.addListener(
      this.onBeforeRequestListener,
      {
        urls: tlds.map((tld) => `*://*.google.${tld}/search?*`),
        types: ["main_frame"],
      },
      ["blocking"]
    );
  }

  stopRequestListener() {
    browser.webRequest.onBeforeRequest.removeListener(
      this.onBeforeRequestListener
    );
  }
}
