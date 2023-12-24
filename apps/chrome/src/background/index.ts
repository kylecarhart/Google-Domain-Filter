import { isEqual } from "lodash";
import browser from "webextension-polyfill";
import {
  disableDynamicRules,
  enableDynamicRules,
  updateDynamicRules,
} from "./netRequestHelper";
import { handleInstalled } from "../../../../libs/common/src/extension/background/handleInstalled";
import { RootState, getStore } from "../../../../libs/common/src/redux/store";

// Handle storage initialization on install.
browser.runtime.onInstalled.addListener(handleInstalled);
const { store } = getStore();

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
