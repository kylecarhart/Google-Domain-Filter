import { isEqual } from "lodash";
import FilterListRequestListener from "./FilterListRequestListener";
import {
  getStateFromStorage,
  store,
} from "../../../../libs/common/src/redux/store";

(async function () {
  let currentState = await getStateFromStorage();
  const { options } = currentState;
  const { filterList } = currentState.domainLists;
  const listener = new FilterListRequestListener(filterList);

  // Get filter mode method
  if (options.filterListEnabled && options.filterMode === "experimental") {
    listener.start();
  }

  store.subscribe(() => {
    let previousState = currentState;
    currentState = store.getState();

    // Update filter list
    if (
      !isEqual(
        currentState.domainLists.filterList,
        previousState?.domainLists.filterList
      )
    ) {
      listener.filterList = currentState.domainLists.filterList;
    }

    // Listen to options to start and stop the filter
    if (
      currentState.options.filterListEnabled &&
      currentState.options.filterMode === "experimental"
    ) {
      console.log("something");
      listener.start(); // listener checks if it is already running, dont worry
    } else {
      listener.stop();
    }
  });
})();
