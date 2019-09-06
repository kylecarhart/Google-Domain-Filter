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
