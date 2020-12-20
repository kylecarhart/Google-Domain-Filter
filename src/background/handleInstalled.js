/**
 * Handler for runtime.onInstalled.
 * @param {*} details - The reason that the runtime.onInstalled event is being dispatched.
 */
function handleInstalled(details) {
  switch (details.reason) {
    case "install": // The extension was installed.
      onInstall(details);
      break;
    case "update": // The extension was updated to a new version.
      onUpdate(details);
      break;
    case "browser_update": // The browser was updated to a new version.
      break;
    case "shared_module_update": // Another extension, which contains a module used by this extension, was updated.
      break;
    default:
      break;
  }
}

/**
 * Handle the install action.
 * @param {*} details - The reason that the runtime.onInstalled event is being dispatched.
 */
async function onInstall(details) {
  const manifest = browser.runtime.getManifest();

  // Initialize the storage area
  await browser.storage.sync.set({ filterList: [], preferenceList: [] });

  console.log(`Extension installed. Current version is: ${manifest.version}`);
}

/**
 * Handle the update action.
 * @param {*} details - The reason that the runtime.onInstalled event is being dispatched.
 */
async function onUpdate(details) {
  const manifest = browser.runtime.getManifest();
  console.log(
    `Extension updated from ${details.previousVersion} -> ${manifest.version}`
  );
}

export default handleInstalled;
