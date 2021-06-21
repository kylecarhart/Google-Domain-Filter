const TEXT_NODE = 3;

/**
 * When experimental mode is turned on, this observer will remove the query
 * string away from the dom.
 */
export default class QueryObserver extends MutationObserver {
  private filterString: string;

  /**
   * Create a mutation observer.
   * @param {string} filterString - The string to remove from the DOM.
   */
  constructor(filterString: string) {
    super((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((addedNode) => {
          // Modify the search input
          if (addedNode instanceof HTMLInputElement) {
            if (addedNode.name === "q") {
              addedNode.value = addedNode.value.substring(
                0,
                addedNode.value.indexOf(this.filterString) - 1
              );
              return;
            }
          }
          // Modify any other text nodes containing the filter query
          if (addedNode instanceof Text) {
            addedNode.nodeValue = addedNode.nodeValue.replace(
              this.filterString,
              ""
            );
            return;
          }
        });
      });
    });
    this.filterString = filterString;
  }

  /**
   * Tell the observer to start listening.
   */
  observe() {
    super.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeOldValue: true,
    });
  }
}
