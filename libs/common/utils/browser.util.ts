import browser from "webextension-polyfill";

export async function isChrome() {
  return browser.runtime.getURL("").startsWith("chrome-extension://");
}

export async function isFirefox() {
  return browser.runtime.getURL("").startsWith("moz-extension://");
}
