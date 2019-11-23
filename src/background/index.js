import RequestListener from '../RequestListener'
const ENTRIES_STORAGE_LOCATION = 'entries'

const requestListener = new RequestListener()

chrome.storage.sync.get(ENTRIES_STORAGE_LOCATION, function(result) {
  requestListener.addListener(result[ENTRIES_STORAGE_LOCATION])
})

// When entries are added to storage, modify the DOM
const changeListener = changes => {
  // if changes werent made to the entires, escape
  if (!changes[ENTRIES_STORAGE_LOCATION]) {
    return
  }

  const domains = changes[ENTRIES_STORAGE_LOCATION].newValue

  requestListener.removeListener()
  requestListener.addListener(domains)
}

chrome.storage.onChanged.addListener(changeListener)
