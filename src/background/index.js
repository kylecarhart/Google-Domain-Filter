import handleInstalled from "./handleInstalled";
import {
  FILTER_MODE_DEFAULT_KEY,
  OPTIONS_KEY,
  FILTER_LIST_ENABLED_KEY,
} from "../storage";
import {
  startRequestListener,
  stopRequestListener,
} from "./onBeforeRequestListener";

(async function () {
  // Handle storage initialization on install.
  browser.runtime.onInstalled.addListener(handleInstalled);

  // Get filter mode method
  const storage = await browser.storage.sync.get(OPTIONS_KEY);
  if (storage[OPTIONS_KEY] && !storage[OPTIONS_KEY][FILTER_MODE_DEFAULT_KEY]) {
    startRequestListener();
  }

  // Listen to changes to filter mode.
  browser.storage.onChanged.addListener((storage) => {
    if (storage[OPTIONS_KEY]) {
      const isDefault = storage[OPTIONS_KEY].newValue[FILTER_MODE_DEFAULT_KEY];
      const filterListEnabled =
        storage[OPTIONS_KEY].newValue[FILTER_LIST_ENABLED_KEY];
      if (!isDefault && filterListEnabled) {
        console.log("started");
        startRequestListener();
      } else {
        console.log("stopped");
        stopRequestListener();
      }
    }
  });
})();
