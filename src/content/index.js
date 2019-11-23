import { DOMAINS_STORAGE_LOCATION } from '../DomainStorageController'

// When domains are added to storage, modify the DOM
const changeListener = change => {
  // Check if domains were changed (and not some other part of storage)
  if (change[DOMAINS_STORAGE_LOCATION]) {
    hideLinksInDOM(change[DOMAINS_STORAGE_LOCATION].newValue)
  }
}

// Remove all search results containing blacklisted domains
const hideLinksInDOM = domains => {
  // Get all links on the page related to a google search
  document.querySelectorAll('.g .r > a').forEach(node => {
    if (domains.length > 0) {
      for (let i = 0; i < domains.length; i++) {
        if (node.href.includes(domains[i])) {
          node.closest('.g').style.display = 'none'
          break
        } else {
          node.closest('.g').style.display = null
        }
      }
    } else {
      node.closest('.g').style.display = null
    }
  })
}

// On page load, get domains from storage and modify the DOM
chrome.storage.sync.get([DOMAINS_STORAGE_LOCATION], function(result) {
  const domains = result[DOMAINS_STORAGE_LOCATION]
  if (domains) {
    hideLinksInDOM(domains)
  }
})

// Listen for changes to domains
chrome.storage.onChanged.addListener(changeListener)

/* https://stackoverflow.com/questions/32533580/deleting-dom-elements-before-the-page-is-displayed-to-the-screen-in-a-chrome-ex */
// Listen to changes to the DOM and change the value of the search
const mutationObserver = new MutationObserver(() => {
  document.querySelector('[aria-label="Search"]').value = document
    .querySelector('[aria-label="Search"]')
    .value.split(' ')
    .filter(elem => !elem.startsWith('-site:'))
    .join(' ')
  mutationObserver.disconnect() // Remove the observer if the value if changed
})

// Start the observer
mutationObserver.observe(document, { subtree: true, childList: true })

// When the document is done loading, remove the observer
document.addEventListener('DOMContentLoaded', function() {
  mutationObserver.disconnect()
})
