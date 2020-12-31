import {
  initRequestListener,
  removeRequestListener,
} from "./handleBeforeRequest";
import handleInstalled from "./handleInstalled";
import { FILTER_MODE_DEFAULT_KEY, OPTIONS_KEY } from "../storage";

// Handle storage initialization on install.
browser.runtime.onInstalled.addListener(handleInstalled);

// Listen to changes for
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
