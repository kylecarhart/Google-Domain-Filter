import URLObject from './URLObject'

// Manages a single request listener
export default class RequestListenerController {
  constructor() {
    this.requestListener = null
  }

  // Request listener handles appending domains to the search query
  _beforeRequestListener(domains, details) {
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

  // Remove the listener
  removeListener() {
    if (
      this.requestListener !== null &&
      chrome.webRequest.onBeforeRequest.hasListener(this.requestListener)
    ) {
      chrome.webRequest.onBeforeRequest.removeListener(this.requestListener)
    }
  }

  // Add listener that filters domains
  addListener(domains) {
    this.requestListener = this._beforeRequestListener.bind(null, domains)
    chrome.webRequest.onBeforeRequest.addListener(
      this.requestListener,
      { urls: ['*://*.google.com/search?*'] },
      ['blocking']
    )
  }
}
