import handleInstalled from "./handleInstalled";
import browser from "webextension-polyfill";
import { storage } from "@common/storage";
import { toExcludeQuery } from "@utils/query.util";

(async function () {
  // Handle storage initialization on install.
  browser.runtime.onInstalled.addListener(handleInstalled);

  storage.filterList.addListener((newFilterList) => {
    // TODO: If the filter list contains nothing, then the as_q param will be empty. Is that okay?
    chrome.declarativeNetRequest.updateDynamicRules({
      addRules: [
        {
          id: 1,
          priority: 1,
          action: {
            type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
            redirect: {
              transform: {
                queryTransform: {
                  addOrReplaceParams: [
                    { key: "as_q", value: toExcludeQuery(newFilterList) },
                  ],
                },
              },
            },
          },
          condition: {
            urlFilter: "*://*.google.*/search?*",
            resourceTypes: [
              chrome.declarativeNetRequest.ResourceType.MAIN_FRAME,
            ],
          },
        },
      ],
      removeRuleIds: [1],
    });
  });

  // Get filter mode method
  const options = await storage.options.get();
  if (options.filterListEnabled && options.filterMode === "experimental") {
    enableExperimental();
  } else {
    disableExperimental();
  }

  storage.options.addListener((options) => {
    if (options.filterListEnabled && options.filterMode === "experimental") {
      enableExperimental();
    } else {
      disableExperimental();
    }
  });
})();

function disableExperimental() {
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [
      {
        id: 2,
        priority: 2,
        action: {
          type: chrome.declarativeNetRequest.RuleActionType.ALLOW,
        },
        condition: {
          urlFilter: "*://*.google.*/search?*",
          resourceTypes: [chrome.declarativeNetRequest.ResourceType.MAIN_FRAME],
        },
      },
    ],
    removeRuleIds: [2],
  });
}

function enableExperimental() {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [2],
  });
}
