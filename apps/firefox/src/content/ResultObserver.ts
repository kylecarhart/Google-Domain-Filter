import {
  getDomainRegExp,
  getParentResultElement,
  setResultElementAsFiltered,
} from "./mutations";

/**
 * The purpose of the ResultObserver is to catch updates to the DOM before they
 * display to the user. This is better than letting the DOM finish loading and
 * then doing mutations because it prevents a DOM update flash.
 *
 * Runs in default (non-experimental) mode.
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
