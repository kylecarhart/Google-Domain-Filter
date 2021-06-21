import {
  getDomainRegExp,
  getParentResultElement,
  setResultElementFiltered,
} from "./mutations";

/**
 * ResultObserver watches the dom for changes and will set matching search
 * results to displaynone.
 */
export default class ResultObserver extends MutationObserver {
  private filterList: string[];

  /**
   * Create a mutation observer.
   * @param {string} filterString - The string to remove from the DOM.
   */
  constructor(filterList: string[]) {
    super((mutations) => {
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
            setResultElementFiltered(parentResultNode);
          }
        });
      });
    });

    this.filterList = filterList;
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
