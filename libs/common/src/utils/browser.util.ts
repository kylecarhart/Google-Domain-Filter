import browser from "webextension-polyfill";

export function isChrome() {
  return browser.runtime.getURL("").startsWith("chrome-extension://");
}

export function isFirefox() {
  return browser.runtime.getURL("").startsWith("moz-extension://");
}
