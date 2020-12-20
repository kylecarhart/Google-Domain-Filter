import initRequestListener from "./handleBeforeRequest";
import handleInstalled from "./handleInstalled";

// Handle storage initialization on install.
browser.runtime.onInstalled.addListener(handleInstalled);

// Start the google request listener and redirect.
initRequestListener();
