import { escapeRegExp, getElementsByXPath } from "../utils";

const RESULT_LINK_XPATH =
  "//div[@class='hlcw0c' or @id='rso']/div[@class='g']//div[@class='yuRUbf']/a";
const SINGLE_RESULT_WRAPPER = ".g";
const GROUP_RESULT_WRAPPER = ".hlcw0c";
const MAIN_RESULT_WRAPPER_ID = "rso";

/**
 * Loop through results and call matchCallback() on each match. If no match,
 * optionally call noMatchCallback().
 * @param {[string] | string} input - Domain input. Can be an array or single string.
 * @param {function(HTMLElement)} matchCallback - Callback function on match.
 * @param {function(HTMLElement)} noMatchCallback - Callback function on no match.
 */
function handleResults(input, matchCallback, noMatchCallback = () => {}) {
  let domains = Array.isArray(input) ? input : [input];

  let nodes = getElementsByXPath(RESULT_LINK_XPATH);

  /**
   * We need to sort the array of matching nodes first to accommodate for the
   * preference list sorting. This will sort the node array based on the domain
   * array order, but backwards. This allows the preference list matchCallback
   * to reorder DOM nodes without having to worry about the order.
   */
  nodes.sort((a, b) => {
    let aIdx = domains.findIndex((domain) =>
      getDomainRegExp(domain).test(a.hostname)
    );
    let bIdx = domains.findIndex((domain) =>
      getDomainRegExp(domain).test(b.hostname)
    );

    if (aIdx > bIdx) {
      return -1;
    } else if (aIdx < bIdx) {
      return 1;
    } else {
      return 0;
    }
  });

  /**
   * For each result DOM node, check if hostname matches domain in the list.
   * Go through the nodes backwards because it helps the preference list
   * sort correctly.
   */
  for (let i = nodes.length - 1; i >= 0; i--) {
    const node = nodes[i];

    let resultWrapperNode;

    if (node.closest(GROUP_RESULT_WRAPPER) !== null) {
      resultWrapperNode = node.closest(GROUP_RESULT_WRAPPER);
    } else {
      resultWrapperNode = node.closest(SINGLE_RESULT_WRAPPER);
    }

    let calledBack = false;
    for (let i = 0; i < domains.length; i++) {
      const domain = domains[i];
      const domainRegExp = getDomainRegExp(domain);

      if (domainRegExp.test(node.hostname)) {
        matchCallback(resultWrapperNode);
        calledBack = true;
        break;
      }
    }

    if (!calledBack) {
      noMatchCallback(resultWrapperNode);
    }
  }
}

/**
 * Hide search results matching domain input.
 * @param {[string] | string} input - Domain input. Can be an array or single string.
 */
function removeResults(input) {
  handleResults(
    input,
    (node) => {
      node.setAttribute("displaynone", "");
    },
    (node) => {
      node.removeAttribute("displaynone");
    }
  );
}

/**
 * Highlight and reorder search results matching domain input.
 * @param {[string] | string} input - Domain input. Can be an array or single string.
 */
function highlightResults(input) {
  handleResults(
    input,
    (node) => {
      const rso = document.getElementById(MAIN_RESULT_WRAPPER_ID);
      rso.prepend(node);

      node.setAttribute("preference", "");
    },
    (node) => {
      node.removeAttribute("preference");
    }
  );
}

/**
 * Remove a string from the browser title
 * @param {string} string
 */
function removeFromTitle(string) {
  const title = document.querySelector("title");
  title.text = title.text.replace(string, "");
}

/**
 * Remove a string from the google search input
 * @param {string} string
 */
function removeFromInput(string) {
  const input = document.querySelector('input[name="q"]');
  if (input.value.includes(string)) {
    input.value = input.value.substring(0, input.value.indexOf(string) - 1);
  }
}

/**
 * Generate a regular expression for domain comparison.
 * @param {string} domain - Domain to generate RegExp from.
 */
function getDomainRegExp(domain) {
  const escapedString = escapeRegExp(domain);
  return new RegExp(`^(?:.+\\.)?${escapedString}$`);
}

export {
  removeFromInput,
  removeFromTitle,
  removeResults,
  highlightResults,
  getDomainRegExp,
};
