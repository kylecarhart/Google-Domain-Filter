import { RootState, store, syncStorageConfig } from "@common/redux/store";
import { QUERY_PARAM } from "@constants/index";
import { isEqual } from "lodash";
import getStoredState from "redux-persist/es/getStoredState";
import { filterResults, preferResults } from "./mutations";
import QueryObserver from "./QueryObserver";
import ResultObserver from "./ResultObserver";

(async function () {
  const url = new URL(window.location.href);
  const asQParam = url.searchParams.get(QUERY_PARAM);
  let observer: QueryObserver | ResultObserver = null;

  // Run the query observer when using the Experimental filter mode
  if (asQParam) {
    observer = new QueryObserver(asQParam);
    observer.observe();
  }

  // Get the current state from storage
  let currentState = (await getStoredState(syncStorageConfig)) as RootState;
  let { filterList, preferenceList } = currentState.domainLists;
  let { options } = currentState;

  // If the dom is loading, observe the dom and remove results. When finished, disconnect.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      if (observer) {
        observer.disconnect();
      }

      if (options.preferenceListEnabled) {
        preferResults(preferenceList);
      }

      if (options.filterListEnabled) {
        filterResults(filterList);
      }
    });

    // Run the result observer when using default filter mode
    if (!asQParam && options.filterListEnabled) {
      observer = new ResultObserver(filterList);
      observer.observe();
    }
  } else {
    // Dom is already loaded (possibly due to back/forward navigation)
    if (options.filterListEnabled) {
      filterResults(filterList);
    }

    if (options.preferenceListEnabled) {
      preferResults(preferenceList);
    }
  }

  // Listen for changes to the store and update the UI.
  store.subscribe(() => {
    let previousState = currentState;
    currentState = store.getState();

    // Turn on/off domain filter ui changes
    if (
      currentState.options.filterListEnabled !==
      previousState?.options.filterListEnabled
    ) {
      if (currentState.options.filterListEnabled) {
        filterResults(currentState.domainLists.filterList);
      } else {
        filterResults([]);
      }
    }

    // Turn on/off domain preferences ui changes
    if (
      currentState.options.preferenceListEnabled !==
      previousState?.options.preferenceListEnabled
    ) {
      if (currentState.options.preferenceListEnabled) {
        preferResults(currentState.domainLists.preferenceList);
      } else {
        preferResults([]);
      }
    }

    // Check for changes to filter list
    if (
      !isEqual(
        currentState.domainLists.filterList,
        previousState?.domainLists.filterList
      )
    ) {
      if (currentState.options.filterListEnabled) {
        filterResults(currentState.domainLists.filterList);
      }
    }

    // Check for changes to preference list
    if (
      !isEqual(
        currentState.domainLists.preferenceList,
        previousState?.domainLists.preferenceList
      )
    ) {
      if (currentState.options.preferenceListEnabled) {
        preferResults(currentState.domainLists.preferenceList);
      }
    }
  });
})();
