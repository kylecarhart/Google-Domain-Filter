import handleInstalled from "./handleInstalled";
import storage from "../storage";
import {
  startRequestListener,
  stopRequestListener,
} from "./onBeforeRequestListener";

(async function () {
  // Handle storage initialization on install.
  browser.runtime.onInstalled.addListener(handleInstalled);

  // Get filter mode method
  const options = await storage.options.get();
  if (options.filterListEnabled && options.filterMode === "experimental") {
    startRequestListener();
  }

  storage.options.addListener((options) => {
    if (options.filterListEnabled && options.filterMode === "experimental") {
      startRequestListener();
    } else {
      stopRequestListener();
    }
  });
})();
