import { QUERY_PARAM } from "../../../../libs/common/src/constants";
import { Domain } from "../../../../libs/common/src/types";
import { toExcludeQuery } from "../../../../libs/common/src/utils";

const { RuleActionType, ResourceType } = chrome.declarativeNetRequest;

const ENABLED_RULE_ID = 1;
const DISABLED_RULE_ID = 2;

const URL_FILTER = "*://*.google.*/search?*";

/**
 * Update the dynamic rules with the new domain list to be filtered.
 */
export function updateDynamicRules(domains: Domain[]) {
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [
      {
        id: ENABLED_RULE_ID,
        priority: 1,
        action: {
          type: RuleActionType.REDIRECT,
          redirect: {
            transform: {
              queryTransform: {
                addOrReplaceParams: [
                  { key: QUERY_PARAM, value: toExcludeQuery(domains) },
                ],
              },
            },
          },
        },
        condition: {
          urlFilter: URL_FILTER,
          resourceTypes: [ResourceType.MAIN_FRAME],
        },
      },
    ],
    removeRuleIds: [ENABLED_RULE_ID],
  });
}

/**
 * Disables the dynamic rules by creating a higher priority "ALLOW" rule.
 */
export function disableDynamicRules() {
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [
      {
        id: DISABLED_RULE_ID,
        priority: 2,
        action: {
          type: RuleActionType.ALLOW,
        },
        condition: {
          urlFilter: URL_FILTER,
          resourceTypes: [ResourceType.MAIN_FRAME],
        },
      },
    ],
    removeRuleIds: [DISABLED_RULE_ID],
  });
}

/**
 * Enables dynamic rules by removing a higher priority "ALLOW" rule.
 */
export function enableDynamicRules() {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [DISABLED_RULE_ID],
  });
}
