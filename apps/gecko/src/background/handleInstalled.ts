import { browser, Runtime } from "webextension-polyfill-ts";
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
 * @param {*} details - The reason that the runtime.onInstalled event is being dispatched.
 */
async function onInstall(details: Runtime.OnInstalledDetailsType) {
  const manifest = browser.runtime.getManifest();

  console.log(
    `*** Extension installed. Current version is: ${manifest.version}. ***`
  );
}

/**
 * Handle the update action.
 * @param {*} details - The reason that the runtime.onInstalled event is being dispatched.
 */
async function onUpdate(details: Runtime.OnInstalledDetailsType) {
  const manifest = browser.runtime.getManifest();
  console.log(
    `Extension updated from ${details.previousVersion} -> ${manifest.version}`
  );
}

export default handleInstalled;
