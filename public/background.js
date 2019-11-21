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

// TODO:

// Object to manipulate URLs and their queries
function URLObject(url) {
  this.base = url.split('?')[0]

  // Query map: { q:"asdf", client="firefox", ...}
  this.queries = url.includes('?')
    ? {
        ...url
          .split('?')[1]
          .split('&')
          .map(function(elem) {
            return {
              [elem.split('=')[0]]: elem.split('=')[1]
            }
          })
          .reduce(function(acc, curr) {
            return Object.assign(acc, curr)
          }, {})
      }
    : {}

  // Concatenate query params into string
  this._getQueryString = function() {
    const queryArray = []
    for (const [key, value] of Object.entries(this.queries)) {
      queryArray.push(key + '=' + value)
    }
    return queryArray.join('&')
  }

  // URL Object API
  return {
    base: this.base,
    queries: this.queries,
    toString: () => {
      return this.base + '?' + this._getQueryString()
    }
  }
}
