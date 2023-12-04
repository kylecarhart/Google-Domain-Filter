import browser, { WebRequest } from "webextension-polyfill";
import { QUERY_PARAM } from "../../../../libs/common/src/constants";
import { Domain } from "../../../../libs/common/src/types";
import { toExcludeQuery } from "../../../../libs/common/src/utils";
import tldsJson from "../../../../libs/common/src/constants/tlds.json";

export default class FilterListRequestListener {
  filterList: Domain[];
  private isRunning: boolean;
  private listener = (details: WebRequest.OnBeforeRequestDetailsType) => {
    // If there are no domains, don't bother redirecting
    if (!this.filterList || this.filterList.length === 0) {
      return;
    }

    const url = new URL(details.url);
    const params = url.searchParams;
    const filterString = toExcludeQuery(this.filterList);

    // Add the sites to the query if it doesn't contain them already
    if (!params.get(QUERY_PARAM)) {
      params.set(QUERY_PARAM, filterString);
    } else {
      return;
    }

    return {
      redirectUrl: url.toString(), // Redirect
    };
  };

  constructor(filterList: Domain[] = []) {
    this.filterList = filterList;
    this.isRunning = false;
  }

  start() {
    if (!this.isRunning) {
      browser.webRequest.onBeforeRequest.addListener(
        this.listener,
        {
          urls: tldsJson.tlds.map((tld) => `*://*.google.${tld}/search?*`),
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
