/**
 * On storage change, remove DOM links of domains that are in storage.
 * @param {Object} storage - Browser storage object.
 */
function storageChangeListener(storage) {
  let filterList = [];
  if (storage.filterList) {
    filterList = storage.filterList.newValue;
  }

  // Get all links on the page related to a google search
  document.querySelectorAll(".g .rc a:not([class])").forEach((node) => {
    const closestNode = node.closest(".g");

    for (let i = 0; i < filterList.length; i++) {
      if (node.href.includes(filterList[i])) {
        closestNode.style.display = "none";
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

export { storageChangeListener, removeFromInput, removeFromTitle };
