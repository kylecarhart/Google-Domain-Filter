import handleInstalled from "./handleInstalled";
import FilterListRequestListener from "./FilterListRequestListener";
import browser from "webextension-polyfill";
import { storage } from "@common/storage";

(async function () {
  // Handle storage initialization on install.
  browser.runtime.onInstalled.addListener(handleInstalled);

  const filterList = await storage.filterList.get();
  const listener = new FilterListRequestListener(filterList);

  storage.filterList.addListener((newFilterList) => {
    listener.filterList = newFilterList;
  });

  // Get filter mode method
  const options = await storage.options.get();
  if (options.filterListEnabled && options.filterMode === "experimental") {
    listener.start();
  }

  storage.options.addListener((options) => {
    if (options.filterListEnabled && options.filterMode === "experimental") {
      listener.start(); // listener checks if it is already running, dont worry
    } else {
      listener.stop();
    }
  });
})();
