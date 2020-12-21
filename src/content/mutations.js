import { escapeRegExp } from "../utils";

const PREFERENCE_CLASS = "preference";
const DISPLAY_NONE_CLASS = "displaynone";

const RESULTS_WRAPPER_QUERY = "#rso";
const RESULTS_GROUP_QUERY = ".hlcw0c";
const RESULT_WRAPPER_QUERY = ".g";
const RESULT_LINK_QUERY = ".g .rc .yuRUbf>a";

/**
 * Loop through results and call matchCallback() on each match. If no match,
 * optionally call noMatchCallback().
 * @param {[string] | string} input - Domain input. Can be an array or single string.
 * @param {function(HTMLElement)} matchCallback - Callback function on match.
 * @param {function(HTMLElement)} noMatchCallback - Callback function on no match.
 */
function handleResults(input, matchCallback, noMatchCallback = () => {}) {
  let domainArr = Array.isArray(input) ? input : [input];

  let nodes = Array.from(document.querySelectorAll(RESULT_LINK_QUERY));

  // Filter out any nonstandard results
  nodes.filter((node) => {
    if (node.closest(".ULSxyf")) {
      return false;
    } else {
      return true;
    }
  });

  /**
   * We need to sort the array of matching nodes first to accommodate for the
   * preference list sorting. This will sort the node array based on the domain
   * array order, but backwards. This allows the preference list matchCallback
   * to reorder DOM nodes without having to worry about the order.
   */
  nodes.sort((a, b) => {
    let aIdx = domainArr.findIndex((domain) =>
      getDomainRegExp(domain).test(a.hostname)
    );
    let bIdx = domainArr.findIndex((domain) =>
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

  // For each result DOM node, check if hostname matches domain in the list
  nodes.forEach((node) => {
    const resultWrapperNode = node.closest(RESULT_WRAPPER_QUERY);

    let calledBack = false;
    for (let i = 0; i < domainArr.length; i++) {
      const domain = domainArr[i];
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
  });
}

/**
 * Hide search results matching domain input.
 * @param {[string] | string} input - Domain input. Can be an array or single string.
 */
function removeResults(input) {
  handleResults(
    input,
    (node) => {
      node.classList.add(DISPLAY_NONE_CLASS);
    },
    (node) => {
      node.classList.remove(DISPLAY_NONE_CLASS);
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
      node.classList.add(PREFERENCE_CLASS);

      const resultsWrapperNode = node.closest(RESULTS_WRAPPER_QUERY);
      const resultsGroupNode = resultsWrapperNode.querySelector(
        RESULTS_GROUP_QUERY
      );

      if (resultsGroupNode) {
        // Sometimes this doesnt exist for some reason...
        resultsGroupNode.insertBefore(node, resultsGroupNode.childNodes[0]);
      } else {
        resultsWrapperNode.insertBefore(node, resultsWrapperNode.childNodes[0]);
      }
    },
    (node) => {
      node.classList.remove(PREFERENCE_CLASS);
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
  input.value = input.value.substring(0, input.value.indexOf(string) - 1);
}

/**
 * Generate a regular expression for domain comparison.
 * @param {string} domain - Domain to generate RegExp from.
 */
function getDomainRegExp(domain) {
  const escapedString = escapeRegExp(domain);
  return new RegExp(`^(?:.+\\.)?${escapedString}$`);
}

export { removeFromInput, removeFromTitle, removeResults, highlightResults };
