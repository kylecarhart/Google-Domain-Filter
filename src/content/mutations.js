import { escapeRegExp } from "../utils";

const MAIN_RESULT_WRAPPER_ID = "rso";
const LINK_QUERY_SELECTOR = ".yuRUbf a";
const ACCEPTABLE_SEARCH_RESULT_CLASSES = ["g", "hlcw0c"];

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
   * Associate the search result hostname with its greatest ancestor node contained
   * in the main search results wrapper.
   */
  let resultNodeArr = Array.from(
    document.getElementById(MAIN_RESULT_WRAPPER_ID).childNodes
  )
    .filter((childNode) => {
      if (
        ACCEPTABLE_SEARCH_RESULT_CLASSES.some((cssClass) =>
          childNode.classList.contains(cssClass)
        )
      ) {
        return true;
      }
    })
    .map((childNode, index) => {
      let link = childNode.querySelector(LINK_QUERY_SELECTOR);
      if (link) {
        let resultNode = {
          hostname: childNode.querySelector(LINK_QUERY_SELECTOR).hostname,
          node: childNode,
          originalPos: index,
        };

        return resultNode;
      }
    });

  /**
   * Nodes are sorted to account for preference list positions, but in reverse
   * order. This allows for the callback to simply bring the currently processed
   * node to the top of the stack so the last node to be processed would actually
   * be first in the search results.
   *
   * This has no effect the filter list.
   */
  resultNodeArr.sort((a, b) => {
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
      // When the hosts match, take into considderation their original ranks
      if (a.originalPos > b.originalPos) {
        return -1;
      } else {
        return 1;
      }
    }
  });

  /**
   * For each result DOM node, check if hostname matches domain in the list
   * and call the appropriate callback function.
   */
  resultNodeArr.forEach((resultNode) => {
    const domain = domains.find((domain) =>
      getDomainRegExp(domain).test(resultNode.hostname)
    );

    if (domain) {
      matchCallback(resultNode.node);
    } else {
      noMatchCallback(resultNode.node);
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
      setResultNodeFiltered(node);
    },
    (node) => {
      setResultNodeUnfiltered(node);
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
      setResultNodePreferred(node);
    },
    (node) => {
      setResultNodeUnpreferred(node);
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

/**
 * Find the parent search result node of an anchor tag.
 * Returns null if there is no match.
 * @param {Node} linkNode - Anchor node
 */
function getParentResultNode(linkNode) {
  if (linkNode.nodeName !== "A") {
    return null;
  }
  if (!linkNode.parentNode.className === "yuRUbf") {
    return null;
  }

  return linkNode.closest("#rso > .g, #rso > .hlcw0c");
}

/**
 * Set the node to hidden using "displaynone" attribute
 * @param {Node} node - DOM node
 */
function setResultNodeFiltered(node) {
  node.setAttribute("displaynone", "");
}

/**
 * Set the node to unhidden using "displaynone" attribute
 * @param {Node} node - DOM node
 */
function setResultNodeUnfiltered(node) {
  node.removeAttribute("displaynone");
}

/**
 * Set the node to preferred using "preference" attribute
 * @param {Node} node - DOM node
 */
function setResultNodePreferred(node) {
  node.setAttribute("preference", "");
}

/**
 * Set the node to unpreferred using "preference" att
 * @param {Node} node - DOM node
 */
function setResultNodeUnpreferred(node) {
  node.removeAttribute("preference");
}

export {
  removeFromInput,
  removeFromTitle,
  removeResults,
  highlightResults,
  getDomainRegExp,
  getParentResultNode,
  setResultNodeFiltered,
};
