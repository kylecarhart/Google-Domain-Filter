/**
 * When experimental mode is turned on, this observer will remove the query
 * string away from the dom as it loads (to prevent DOM update flashing)
 */
export default class QueryObserver implements MutationObserver {
  filterString: string;
  observer: MutationObserver;

  /**
   * Create a mutation observer.
   */
  constructor(filterString: string) {
    this.filterString = filterString;
    this.observer = new MutationObserver((mutations) => {
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

          // Fix for google maps and other links
          if (addedNode instanceof HTMLAnchorElement) {
            addedNode.href = addedNode.href.replace(this.filterString, "");
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
  }

  observe() {
    this.observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeOldValue: true,
    });
  }

  disconnect() {
    this.observer.disconnect();
  }

  takeRecords() {
    return this.observer.takeRecords();
  }
}
