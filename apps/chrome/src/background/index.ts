import { storage } from "@common/storage";
import {
  disableDynamicRules,
  enableDynamicRules,
  updateDynamicRules,
} from "./netRequestHelper";

(async function () {
  storage.filterList.addListener((filterList) => {
    // TODO: If the filter list contains nothing, then the as_q param will be empty. Is that okay?
    updateDynamicRules(filterList);
  });

  // Turn on/off the declarativeNetRequest initially for experimental mode.
  const options = await storage.options.get();
  if (options.filterListEnabled && options.filterMode === "experimental") {
    enableDynamicRules();
  } else {
    disableDynamicRules();
  }

  // Listen for changes to the filter mode option and turn on/off declarativeNetRequest rules
  storage.options.addListener((options) => {
    if (options.filterListEnabled && options.filterMode === "experimental") {
      enableDynamicRules();
    } else {
      disableDynamicRules();
    }
  });
})();
