import { getDomainRegExp } from "./mutations";

/**
 * Class representing the mutation observer
 */
export default class ResultObserver {
  /**
   * Create a mutation observer.
   * @param {string} filterString - The string to remove from the DOM.
   */
  constructor(filterList) {
    this.filterList = filterList;
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((addedNode) => {
          if (
            addedNode.nodeName === "A" &&
            addedNode.parentElement.className === "yuRUbf" &&
            filterList.some((domain) =>
              getDomainRegExp(domain).test(addedNode.hostname)
            )
          ) {
            addedNode.closest(".g").setAttribute("displaynone", "");
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
