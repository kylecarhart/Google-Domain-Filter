import { handleStorageMigrations } from "../../utils/migrationUtils";
import browser, { Runtime } from "webextension-polyfill";

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
  const { version: currentVersion } = manifest;
  const { previousVersion } = details;

  // Migrate storage if a new version is available.
  handleStorageMigrations();

  console.log(`Extension updated from ${previousVersion} -> ${currentVersion}`);
}

export { handleInstalled };
