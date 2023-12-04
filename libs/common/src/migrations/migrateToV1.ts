import browser from "webextension-polyfill";
import {
  STORAGE_FILTERLIST,
  STORAGE_OPTIONS,
  STORAGE_PREFERENCELIST,
} from "../constants";
import { set } from "../redux/features/domainList/domainListSlice";
import { setOptions } from "../redux/features/options/optionsSlice";
import { store } from "../redux/store";
import { setStorageVersion } from "../utils/migrationUtils";

/**
 * Migrate storage to version 1.
 * Local storage will now use redux-persist as primary means of storing data.
 */
export async function migrateToV1() {
  const storage = await browser.storage.sync.get();

  // Migrate options
  if (storage["options"]) {
    store.dispatch(setOptions(storage["options"]));
    await browser.storage.sync.remove(STORAGE_OPTIONS);
  }

  // Migrate domain lists
  if (storage["filterList"]) {
    store.dispatch(set({ domains: storage["filterList"], type: "filterList" }));
    await browser.storage.sync.remove(STORAGE_FILTERLIST);
  }

  // Migrate preference lists
  if (storage["preferenceList"]) {
    store.dispatch(
      set({ domains: storage["preferenceList"], type: "preferenceList" })
    );
    await browser.storage.sync.remove(STORAGE_PREFERENCELIST);
  }

  // Set storage version
  await setStorageVersion(1);
}
