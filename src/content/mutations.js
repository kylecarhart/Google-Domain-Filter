const PREFERENCE_CLASS = "preference";
const DISPLAY_NONE_CLASS = "displaynone";

const RESULTS_WRAPPER_QUERY = "#rso";
const RESULTS_GROUP_QUERY = ".hlcw0c";
const RESULT_WRAPPER_QUERY = ".g";
const RESULT_LINK_QUERY = ".g .rc .yuRUbf>a";

/**
 * Loop through results and call matchCallback() on each match.
 * If no match, call noMatchCallback().
 * @param {[string] | string} input - Domain input. Can be an array or single string.
 * @param {function(HTMLElement)} matchCallback - Callback function on match.
 * @param {function(HTMLElement)} noMatchCallback - Callback function on no match.
 */
function handleResults(input, matchCallback, noMatchCallback = () => {}) {
  let domainArr = Array.isArray(input) ? input : [input];

  // For each result DOM node, check if href matches domain in the list
  // TODO: Find solution for prefernce list being out of order
  document.querySelectorAll(RESULT_LINK_QUERY).forEach((node) => {
    const resultWrapperNode = node.closest(RESULT_WRAPPER_QUERY);

    let calledBack = false;
    for (let i = 0; i < domainArr.length; i++) {
      const nodeHostName = new URL(node.href).hostname;
      if (nodeHostName.endsWith(domainArr[i])) {
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

export { removeFromInput, removeFromTitle, removeResults, highlightResults };
