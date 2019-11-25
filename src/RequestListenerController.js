// Manages a single request listener
export default class RequestListenerController {
  constructor() {
    this.requestListener = null
  }

  // Request listener handles appending domains to the search query
  _beforeRequestListener(domains, details) {
    let url = new URL(details.url)

    // Escape from redirect if query already contains blacklisted link
    if (domains.every(elem => url.searchParams.get('q').includes(elem))) {
      return
    }

    // modify the search query exclude blacklisted domains
    url.searchParams.set(
      'q',
      url.searchParams.get('q') +
        ' ' +
        domains.map(elem => `-site:${elem}`).join(' ')
    )

    return {
      redirectUrl: url.toString()
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
