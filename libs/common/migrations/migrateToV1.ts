import { set } from "@common/redux/features/domainList/domainListSlice";
import { setOptions } from "@common/redux/features/options/optionsSlice";
import { store } from "@common/redux/store";
import {
  STORAGE_FILTERLIST,
  STORAGE_OPTIONS,
  STORAGE_PREFERENCELIST,
} from "@constants/index";
import { setStorageVersion } from "@utils/migrationUtils";
import browser from "webextension-polyfill";

/**
 * Migrate storage to version 1.
 * Local storage will now use redux-persist as primary means of storing data.
 */
export async function migrateToV1() {
  const storage = await browser.storage.sync.get();

  // Migrate options
  if (storage.options) {
    store.dispatch(setOptions(storage.options));
    await browser.storage.sync.remove(STORAGE_OPTIONS);
  }

  // Migrate domain lists
  if (storage.filterList) {
    store.dispatch(set({ domains: storage.filterList, type: "filterList" }));
    await browser.storage.sync.remove(STORAGE_FILTERLIST);
  }

  // Migrate preference lists
  if (storage.preferenceList) {
    store.dispatch(
      set({ domains: storage.preferenceList, type: "preferenceList" })
    );
    await browser.storage.sync.remove(STORAGE_PREFERENCELIST);
  }

  // Set storage version
  await setStorageVersion(1);
}
