import {
  initRequestListener,
  removeRequestListener,
} from "./handleBeforeRequest";
import handleInstalled from "./handleInstalled";
import { FILTER_MODE_DEFAULT_KEY, OPTIONS_KEY } from "../storage";

(async function () {
  // Handle storage initialization on install.
  browser.runtime.onInstalled.addListener(handleInstalled);

  // Get filter mode method
  const storage = await browser.storage.sync.get(OPTIONS_KEY);
  if (storage[OPTIONS_KEY] && !storage[OPTIONS_KEY][FILTER_MODE_DEFAULT_KEY]) {
    initRequestListener();
  }

  // Listen to changes to filter mode.
  browser.storage.onChanged.addListener((storage) => {
    if (storage[OPTIONS_KEY]) {
      const isDefault = storage[OPTIONS_KEY].newValue[FILTER_MODE_DEFAULT_KEY];
      if (isDefault) {
        removeRequestListener();
      } else {
        initRequestListener();
      }
    }
  });
})();
