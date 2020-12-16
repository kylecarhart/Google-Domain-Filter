/**
 * Remove domains from the Google search results.
 * @param {[string] | string} input - Domain input. Can be an array or single string.
 */
function removeDomainsFromResults(input) {
  console.log("here", input);
  let domainArr = Array.isArray(input) ? input : [input];

  // Get all links on the page related to a google search
  document.querySelectorAll(".g").forEach((node) => {
    for (let i = 0; i < domainArr.length; i++) {
      if (node.innerHTML.includes(domainArr[i])) {
        node.style.display = "none";
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

export { removeDomainsFromResults, removeFromInput, removeFromTitle };
