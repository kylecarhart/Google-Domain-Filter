import { browser, WebRequest } from "webextension-polyfill-ts";
import { tlds } from "../tlds.json";
import { DomainList } from "../types";
import { toExcludeQuery } from "../utils";

export default class FilterListRequestListener {
  filterList: DomainList;
  private isRunning: boolean;
  private listener = (details: WebRequest.OnBeforeRequestDetailsType) => {
    // If there are no domains, don't bother redirecting
    if (!this.filterList && this.filterList.length === 0) {
      return;
    }

    const url = new URL(details.url);
    const params = url.searchParams;
    const filterString = toExcludeQuery(this.filterList);

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

  constructor(filterList: DomainList = []) {
    this.filterList = filterList;
    this.isRunning = false;
  }

  start() {
    if (!this.isRunning) {
      browser.webRequest.onBeforeRequest.addListener(
        this.listener,
        {
          urls: tlds.map((tld) => `*://*.google.${tld}/search?*`),
          types: ["main_frame"],
        },
        ["blocking"]
      );

      this.isRunning = true;
    }
  }

  stop() {
    if (this.isRunning) {
      browser.webRequest.onBeforeRequest.removeListener(this.listener);
      this.isRunning = false;
    }
  }
}
