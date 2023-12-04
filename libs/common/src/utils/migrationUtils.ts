import browser from "webextension-polyfill";
import { migrateToV1 } from "../migrations/migrateToV1";

/**
 * Handle migration of local storage to the latest version. If there are any
 * issues, start fresh so we can get the user back on track.
 */
export async function handleStorageMigrations() {
  // Handle storage migrations
  const { storageVersion } = await browser.storage.sync.get("storageVersion");

  try {
    await migrate(storageVersion);
  } catch (e) {
    console.error(e);

    // Nuke storage and start fresh...
    await browser.storage.sync.clear();
    await migrate(0);

    // TODO: Add a notification to the user that their settings were reset.
  }
}

/**
 * Migrate storage to the latest version from the specified version.
 * @param currentVersion Current storage version.
 */
export async function migrate(currentVersion: number) {
  switch (currentVersion) {
    // @ts-expect-error - Intentional fall-thru
    case 0:
      await migrateToV1();
    // eslint-disable-next-line no-fallthrough
    default:
      console.log("No migrations to run.");
  }
}

/**
 * Set the storage version.
 * @param versionNumber Version number to set.
 */
export async function setStorageVersion(versionNumber: number) {
  return await browser.storage.sync.set({ storageVersion: versionNumber });
}
