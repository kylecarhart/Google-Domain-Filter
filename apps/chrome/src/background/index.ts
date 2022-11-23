import { RootState, store } from "@common/redux/store";
import { isEqual } from "lodash";
import {
  disableDynamicRules,
  enableDynamicRules,
  updateDynamicRules,
} from "./netRequestHelper";

(async function () {
  let currentState: RootState;
  store.subscribe(() => {
    let previousState = currentState;
    currentState = store.getState();

    // Update the dynamic rules if the filterlist has changed.
    if (
      !isEqual(
        currentState.domainLists.filterList,
        previousState?.domainLists.filterList
      )
    ) {
      updateDynamicRules(currentState.domainLists.filterList);
    }

    // Enable/Disable the dynamic rules if the options change
    if (!isEqual(currentState.options, previousState?.options)) {
      if (
        currentState.options.filterListEnabled &&
        currentState.options.filterMode === "experimental"
      ) {
        enableDynamicRules();
      } else {
        disableDynamicRules();
      }
    }
  });
})();
