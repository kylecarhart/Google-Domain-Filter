import {
  getDomainRegExp,
  getParentResultElement,
  setResultElementAsFiltered,
} from "./mutations";

/**
 * ResultObserver watches the dom for changes and will set matching search
 * results to displaynone.
 */
export default class ResultObserver implements MutationObserver {
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
            getParentResultElement(addedNode) &&
            this.filterList.some((domain) =>
              getDomainRegExp(domain).test(addedNode.hostname)
            )
          ) {
            const parentResultNode = getParentResultElement(addedNode);
            setResultElementAsFiltered(parentResultNode);
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
