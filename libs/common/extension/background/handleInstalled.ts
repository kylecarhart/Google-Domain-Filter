import { FIRST_VERSION } from "@constants/index";
import semver from "semver";
import browser, { Runtime } from "webextension-polyfill";
import { migrateStorage } from "./storageMigration";

/**
 * Handler for runtime.onInstalled.
 * @param {*} details - The reason that the runtime.onInstalled event is being dispatched.
 */
function handleInstalled(details: Runtime.OnInstalledDetailsType) {
  switch (details.reason) {
    case "install": // The extension was installed.
      onInstall(details);
      break;
    case "update": // The extension was updated to a new version.
      onUpdate(details);
      break;
    case "browser_update": // The browser was updated to a new version.
      break;
    default:
      break;
  }
}

/**
 * Handle the install action.
 */
async function onInstall(details: Runtime.OnInstalledDetailsType) {
  const manifest = browser.runtime.getManifest();

  console.log(
    `*** Extension installed. Current version is: ${manifest.version}. ***`
  );
}

/**
 * Handle the update action.
 */
async function onUpdate(details: Runtime.OnInstalledDetailsType) {
  const manifest = browser.runtime.getManifest();
  const { version } = manifest;
  const { previousVersion } = details;

  if (version === previousVersion) {
    console.log("Previous version is the same as current version.");
    return;
  }

  if (!semver.valid(previousVersion)) {
    console.error("Previous version is invalid semver format");
    return;
  } else if (!semver.valid(version)) {
    console.error("Current version is invalid semver format");
    return;
  }

  try {
    await updateFromVersion(previousVersion);
  } catch (e) {
    console.error(
      `Exception occurred while updating from previous version: ${previousVersion}, 
      attempting to update from first version...`
    );

    try {
      await updateFromVersion(FIRST_VERSION);
    } catch (e) {
      console.error(`Unable to resolve updates from first version.`);
      throw e;
    }
  }

  console.log(`Extension updated from ${previousVersion} -> ${version}`);
}

async function updateFromVersion(version: string) {
  // Intentional fall-thru
  switch (version) {
    case FIRST_VERSION:
      // Reset storage
      await browser.storage.sync.clear();
    case "1.1.0":
    case "1.1.1":
    case "1.2.0":
      // Update to 1.3.0
      await migrateStorage();
    default:
      throw new Error("Version not found in migration path");
  }
}

export { handleInstalled };
