/**
 * Remove domains from the Google search results.
 * @param {[string] | string} input - Domain input. Can be an array or single string.
 */
function removeResults(input) {
  let domainArr = Array.isArray(input) ? input : [input];

  // Get all links on the page related to a google search
  document.querySelectorAll(".g .rc .yuRUbf a").forEach((node) => {
    const parent = node.closest(".g");
    for (let i = 0; i < domainArr.length; i++) {
      if (node.innerHTML.includes(domainArr[i])) {
        parent.style.display = "none";
        break;
      }
    }
  });
}

/**
 * Remove domains from the Google search results.
 * @param {[string] | string} input - Domain input. Can be an array or single string.
 */
function highlightResults(input) {
  let domainArr = Array.isArray(input) ? input : [input];

  // Get all links on the page related to a google search
  document.querySelectorAll(".g .rc .yuRUbf a").forEach((node) => {
    const parent = node.closest(".g");
    for (let i = 0; i < domainArr.length; i++) {
      if (node.innerHTML.includes(domainArr[i])) {
        parent.classList.add("preference");
        break;
      }
    }
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

export { removeResults, removeFromInput, removeFromTitle, highlightResults };
