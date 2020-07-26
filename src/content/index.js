function storageChangeListener(storage) {
  let domains = [];
  if (storage.domains) {
    domains = storage.domains.newValue;
  }

  // Get all links on the page related to a google search
  document.querySelectorAll('.g .r > a').forEach((node) => {
    const closestNode = node.closest('.g');

    for (let i = 0; i < domains.length; i++) {
      if (node.href.includes(domains[i])) {
        closestNode.style.display = 'none';
        break;
      }
    }
  });
}

function handleMutations(mutations, filterString) {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((addedNode) => {
      switch (addedNode.nodeType) {
        case 1: // Element
          if (addedNode.tagName === 'INPUT') {
            if (addedNode.getAttribute('value')) {
              addedNode.setAttribute(
                'value',
                addedNode.getAttribute('value').replace(filterString, '').trim()
              );
            }
          }
          break;
        case 3: // Text
          addedNode.nodeValue = addedNode.nodeValue.replace(filterString, '');
          break;
        default:
          break;
      }
    });
  });
}

// Start google domain filtering script
(async function () {
  const storage = await browser.storage.sync.get('domains');
  const domains = storage.domains || [];

  if (domains.length === 0) {
    return; // No domains to filter, break out early.
  }

  const filterString = domains.map((domain) => `-site:${domain}`).join(' ');

  // Remove filterString from title
  const title = document.querySelector('title');
  title.innerHTML = `${title.innerHTML.substring(
    0,
    title.innerHTML.indexOf(filterString)
  )} - Google Search`;

  // Mutate google search as the DOM builds
  const observer = new MutationObserver((mutations) => {
    handleMutations(mutations, filterString);
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  document.addEventListener('DOMContentLoaded', () => {
    observer.disconnect();
  });

  // Listen for changes to domains
  browser.storage.onChanged.addListener(storageChangeListener);
})();
