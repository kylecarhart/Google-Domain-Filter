import { QUERY_PARAM_NAME } from '../RequestListenerController';
import { DOMAIN_STORAGE_KEY } from '../DomainRepository';

/* ------- START STORAGE LISTENER ------- */

// When domains are added to storage, modify the DOM
const changeListener = (change) => {
  // Check if domains were changed (and not some other part of storage)
  if (change[DOMAIN_STORAGE_KEY]) {
    hideLinksInDOM(change[DOMAIN_STORAGE_KEY].newValue);
  }
};

// Remove all search results containing blacklisted domains
const hideLinksInDOM = (domains) => {
  // Get all links on the page related to a google search
  document.querySelectorAll('.g .r > a').forEach((node) => {
    if (domains.length > 0) {
      for (let i = 0; i < domains.length; i++) {
        if (node.href.includes(domains[i])) {
          node.closest('.g').style.display = 'none';
          break;
        } else {
          node.closest('.g').style.display = null;
        }
      }
    } else {
      node.closest('.g').style.display = null;
    }
  });
};

// Listen for changes to domains
chrome.storage.onChanged.addListener(changeListener);

/* ------- END STORAGE LISTENER ------- */
/* ------- START DOM OBSERVER ------- */

const urlSearchParams = new URLSearchParams(window.location.search);
const domains = urlSearchParams.get(QUERY_PARAM_NAME).split(' ');

/* https://stackoverflow.com/questions/32533580/deleting-dom-elements-before-the-page-is-displayed-to-the-screen-in-a-chrome-ex */
// Listen to changes to the DOM and change the value of the search
const observer = new MutationObserver(function (mutations) {
  for (let i = 0; i < mutations.length; i++) {
    for (let j = 0; j < mutations[i].addedNodes.length; j++) {
      let node = mutations[i].addedNodes[j];

      // Fix search input
      if (node.data === ' ') {
        document.querySelector('[aria-label="Search"]').value = document
          .querySelector('[aria-label="Search"]')
          .value.split(' ')
          .filter((elem) => !elem.startsWith('-site:'))
          .join(' ');
      }
      // Fix "Showing Results For"
      else if (node.id === 'fprsl') {
        node.lastChild.nodeValue = filterDomainsFromString(
          node.lastChild.nodeValue,
          domains
        );
      }
      // Fix "Search instead for"
      else if (node.tagName === 'A' && node.className == 'spell_orig') {
        node.innerText = filterDomainsFromString(node.innerText, domains);
      }
      // FIXME:
      // Fix "Searches related to"
      else if (node.tagName === 'H3' && node.className === 'med dPAwzb') {
        node.innerText = filterDomainsFromString(node.innerText, domains);
      }
      // Fix "Did you mean"
      else if (node.tagName === 'A' && node.className === 'gL9Hy') {
        node.lastChild.nodeValue = filterDomainsFromString(
          node.lastChild.nodeValue,
          domains
        );
      }
    }
  }
});

// Start observing
observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
});

// When the document is done loading, remove the observer
document.addEventListener('DOMContentLoaded', function () {
  observer.disconnect();
});

// Given an array of domains, filter the domains out of the string (preceded by '-site:')
const filterDomainsFromString = (string, domains) => {
  return string
    .split(' ')
    .filter((word) => !domains.includes(word.replace('-site:', '')))
    .join(' ');
};

/* ------- END DOM OBSERVER ------- */
