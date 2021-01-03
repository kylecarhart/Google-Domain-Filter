const TEXT_NODE = 3;

/**
 * Class representing the mutation observer
 */
export default class QueryObserver {
  /**
   * Create a mutation observer.
   * @param {string} filterString - The string to remove from the DOM.
   */
  constructor(filterString) {
    this.filterString = filterString;
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((addedNode) => {
          // Modify the search input
          if (addedNode.nodeName === "INPUT" && addedNode.name === "q") {
            addedNode.value = addedNode.value.substring(
              0,
              addedNode.value.indexOf(this.filterString) - 1
            );
            return;
          }

          if (addedNode.nodeName === "A") {
            // console.log(addedNode.href, addedNode.closest(".g"));
          }

          // Modify any other text nodes containing the filter query
          if (addedNode.nodeType === TEXT_NODE) {
            addedNode.nodeValue = addedNode.nodeValue.replace(
              this.filterString,
              ""
            );
            return;
          }
        });
      });
    });
  }

  /**
   * Tell the observer to start listening.
   */
  observe() {
    this.observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeOldValue: true,
    });
  }

  /**
   * Tell the observer to disconnect.
   */
  disconnect() {
    this.observer.disconnect();
  }
}
