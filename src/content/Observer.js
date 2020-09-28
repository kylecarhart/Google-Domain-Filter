const TEXT_NODE = 3;

export default class Observer {
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

  observe() {
    this.observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  disconnect() {
    this.observer.disconnect();
  }
}
