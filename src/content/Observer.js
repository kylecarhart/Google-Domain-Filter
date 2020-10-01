const TEXT_NODE = 3;

/** Class representing a Mutation Observer */
class Observer {
  /**
   * Create a mutation observer.
   * @param {string} filterString - The string to remove from the DOM.
   */
  constructor(filterString) {
    this.filterString = filterString;
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((addedNode) => {
          switch (addedNode.nodeType) {
            case TEXT_NODE:
              addedNode.nodeValue = addedNode.nodeValue.replace(this.filterString, '');
              break;
            default:
              break;
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
    });
  }

  /**
   * Tell the observer to disconnect.
   */
  disconnect() {
    this.observer.disconnect();
  }
}

export { Observer };
