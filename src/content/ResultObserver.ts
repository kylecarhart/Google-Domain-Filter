import {
  getDomainRegExp,
  getParentResultNode,
  setResultNodeFiltered,
} from "./mutations";

/**
 * ResultObserver watches the dom for changes and will set matching search
 * results to displaynone.
 */
export default class ResultObserver {
  filterList: string[];
  observer: MutationObserver;

  /**
   * Create a mutation observer.
   * @param {string} filterString - The string to remove from the DOM.
   */
  constructor(filterList: string[]) {
    this.filterList = filterList;
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((addedNode) => {
          if (
            addedNode instanceof HTMLAnchorElement &&
            getParentResultNode(addedNode) &&
            filterList.some((domain) =>
              getDomainRegExp(domain).test(addedNode.hostname)
            )
          ) {
            const parentResultNode = getParentResultNode(addedNode);
            setResultNodeFiltered(parentResultNode);
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
