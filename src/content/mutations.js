const PREFERENCE_CLASS = "preference";

const RESULTS_WRAPPER_QUERY = "#rso";
const RESULTS_GROUP_QUERY = ".hlcw0c";
const RESULT_WRAPPER_QUERY = ".g";
const RESULT_LINK_QUERY = ".g .rc .yuRUbf a";

/**
 * Loop through results and call a callback on each match.
 * @param {[string] | string} input - Domain input. Can be an array or single string.
 * @param {function} callback
 */
function handleResults(input, callback) {
  let domainArr = Array.isArray(input) ? input : [input];

  // Get all links on the page related to a google search
  document.querySelectorAll(RESULT_LINK_QUERY).forEach((node) => {
    const parent = node.closest(RESULT_WRAPPER_QUERY);
    for (let i = 0; i < domainArr.length; i++) {
      if (node.innerHTML.includes(domainArr[i])) {
        callback(parent);
        break;
      }
    }
  });
}

/**
 * Hide search results matching domain input.
 * @param {[string] | string} input - Domain input. Can be an array or single string.
 */
function removeResults(input) {
  handleResults(input, (parent) => {
    parent.style.display = "none";
  });
}

/**
 * Highlight and reorder search results matching domain input.
 * @param {[string] | string} input - Domain input. Can be an array or single string.
 */
function highlightResults(input) {
  handleResults(input, (parent) => {
    parent.classList.add(PREFERENCE_CLASS);

    const resultsNode = parent
      .closest(RESULTS_WRAPPER_QUERY)
      .querySelector(RESULTS_GROUP_QUERY);
    resultsNode.insertBefore(parent, resultsNode.childNodes[0]);
  });
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
