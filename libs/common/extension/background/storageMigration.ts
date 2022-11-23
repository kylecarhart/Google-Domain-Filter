import { set } from "@common/redux/features/domainList/domainListSlice";
import { setOptions } from "@common/redux/features/options/optionsSlice";
import { store } from "@common/redux/store";
import { AppOptions, Domain } from "@common/types";
import browser from "webextension-polyfill";

interface oldStorage {
  filterList: Domain[];
  preferenceList: Domain[];
  options: AppOptions;
}

// Migrate to redux persist
export async function migrateStorage() {
  const storage = (await browser.storage.sync.get()) as oldStorage;

  if (storage.options) {
    store.dispatch(setOptions(storage.options));
    await browser.storage.sync.remove("options");
  }

  if (storage.filterList) {
    store.dispatch(set({ domains: storage.filterList, type: "filterList" }));
    await browser.storage.sync.remove("filterList");
  }

  if (storage.preferenceList) {
    store.dispatch(
      set({ domains: storage.preferenceList, type: "preferenceList" })
    );
    await browser.storage.sync.remove("preferenceList");
  }
}
