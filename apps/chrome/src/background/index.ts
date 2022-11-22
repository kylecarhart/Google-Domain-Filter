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

  /*
   * TODO: Dont think this is necessary anymore. On very first load, experimental is disabled.
   * On subsequent loads, if experimental is enabled, the rules are already in place.
   */
  // const options = await storage.options.get();
  // if (options.filterListEnabled && options.filterMode === "experimental") {
  //   enableDynamicRules();
  // } else {
  //   disableDynamicRules();
  // }

  // Listen for changes to the filter mode
  storage.options.addListener((options) => {
    if (options.filterListEnabled && options.filterMode === "experimental") {
      enableDynamicRules();
    } else {
      disableDynamicRules();
    }
  });
})();
