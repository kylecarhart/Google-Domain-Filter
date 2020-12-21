import { escapeRegExp } from "../utils";

const PREFERENCE_CLASS = "preference";
const DISPLAY_NONE_CLASS = "displaynone";

const RESULT_WRAPPER_QUERY = ".g";
const FIREFOX_RESULT_LINK_QUERY = "#rso > div > div > div > div.yuRUbf > a";
const CHROME_RESULT_LINK_QUERY = "#rso >  div > div > div.yuRUbf > a";

const RESULT_LINK_QUERY = `${FIREFOX_RESULT_LINK_QUERY},${CHROME_RESULT_LINK_QUERY}`;

/**
 * Loop through results and call matchCallback() on each match. If no match,
 * optionally call noMatchCallback().
 * @param {[string] | string} input - Domain input. Can be an array or single string.
 * @param {function(HTMLElement)} matchCallback - Callback function on match.
 * @param {function(HTMLElement)} noMatchCallback - Callback function on no match.
 */
function handleResults(input, matchCallback, noMatchCallback = () => {}) {
  let domains = Array.isArray(input) ? input : [input];

  /**
   * Firefox and Chrome browsers are served differently formatted pages.
   * Firefox search results are grouped into additional divs, however we
   * can query for Firefox and Chrome at the same time here.
   */
  let nodes = Array.from(document.querySelectorAll(RESULT_LINK_QUERY));

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

  // For each result DOM node, check if hostname matches domain in the list
  nodes.forEach((node) => {
    const resultWrapperNode = node.closest(RESULT_WRAPPER_QUERY);

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

      const topResultNode = document
        .querySelector(RESULT_LINK_QUERY)
        .closest(RESULT_WRAPPER_QUERY);

      topResultNode.parentElement.insertBefore(node, topResultNode);
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
