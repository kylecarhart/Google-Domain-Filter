const ENTRIES_STORAGE_LOCATION = 'entries'

chrome.storage.sync.get([ENTRIES_STORAGE_LOCATION], function(result) {
  const entries = result[ENTRIES_STORAGE_LOCATION]
  if (entries) {
    // Get all links on the page related to a google search
    document.querySelectorAll('.g .r > a').forEach(node => {
      entries.some(entry => {
        if (node.href.includes(entry)) {
          // Remove all search results containing blacklisted domains
          node.closest('.g').style.display = 'none'
        }
      })
    })
  }
})
