const ENTRIES_STORAGE_LOCATION = 'entries'

// When entries are added to storage, modify the DOM
const changeListener = change => {
  console.log('storage onchanged')
  // Check if entries were changed (and not some other part of storage)
  if (change[ENTRIES_STORAGE_LOCATION]) {
    modifyDOM(change[ENTRIES_STORAGE_LOCATION].newValue)
  }
}

// Remove all search results containing blacklisted domains
const modifyDOM = entries => {
  // Get all links on the page related to a google search
  document.querySelectorAll('.g .r > a').forEach(node => {
    if (entries.length > 0) {
      for (let i = 0; i < entries.length; i++) {
        if (node.href.includes(entries[i])) {
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

// On page load, get entries from storage and modify the DOM
chrome.storage.sync.get([ENTRIES_STORAGE_LOCATION], function(result) {
  const entries = result[ENTRIES_STORAGE_LOCATION]
  if (entries) {
    modifyDOM(entries)
  }
})

// Listen for changes to entries
chrome.storage.onChanged.addListener(changeListener)

chrome.storage.sync.get(ENTRIES_STORAGE_LOCATION, function(result) {
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
})
