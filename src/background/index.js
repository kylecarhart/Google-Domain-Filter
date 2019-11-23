import URLObject from '../URLObject'

const ENTRIES_STORAGE_LOCATION = 'entries'

// Listens for requests and handles redirects for google searches
function beforeRequestListener(domains, details) {
  let urlObject = new URLObject(details.url)

  // Escape from redirect if query already contains blacklisted link
  if (domains.every(elem => urlObject.queries.q.includes(elem))) {
    return
  }

  // modify the search query exclude blacklisted domains
  urlObject.queries.q += encodeURI(
    '+' + domains.map(elem => `-site:${elem}`).join('+')
  )

  return {
    redirectUrl: urlObject.toString()
  }
}

// When entries are added to storage, modify the DOM
const changeListener = changes => {
  // if changes werent made to the entires, escape
  if (!changes[ENTRIES_STORAGE_LOCATION]) {
    return
  }

  const domains = changes[ENTRIES_STORAGE_LOCATION].newValue

  // remove the old listener
  if (chrome.webRequest.onBeforeRequest.hasListener(someListener)) {
    chrome.webRequest.onBeforeRequest.removeListener(someListener) // remove the old listener
  }
  // create and add a new listener
  someListener = beforeRequestListener.bind(null, domains)
  chrome.webRequest.onBeforeRequest.addListener(
    someListener,
    { urls: ['*://*.google.com/search?*'] },
    ['blocking']
  )
}

chrome.storage.onChanged.addListener(changeListener)
let someListener = beforeRequestListener.bind(null, null)
