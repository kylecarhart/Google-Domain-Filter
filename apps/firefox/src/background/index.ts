import { storage } from "@common/storage";
import FilterListRequestListener from "./FilterListRequestListener";

(async function () {
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
