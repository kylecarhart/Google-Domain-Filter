const URL_FILTER = '*://*.google.com/search?*'

// Manages a single request listener
export default class RequestListenerController {
  constructor(domains = []) {
    this._beforeRequestListener = this._beforeRequestListener.bind(this)
    this.domains = domains
  }

  // Request listener handles appending domains to the search query
  _beforeRequestListener(details) {
    let url = new URL(details.url)

    // Escape from redirect if query already contains blacklisted link
    if (this.domains.every(elem => url.searchParams.get('q').includes(elem))) {
      return
    }

    // modify the search query exclude blacklisted domains
    url.searchParams.set(
      'q',
      url.searchParams.get('q') +
        ' ' +
        this.domains.map(elem => `-site:${elem}`).join(' ')
    )

    return {
      redirectUrl: url.toString()
    }
  }

  // Remove the listener
  removeListener() {
    if (
      chrome.webRequest.onBeforeRequest.hasListener(this._beforeRequestListener)
    ) {
      chrome.webRequest.onBeforeRequest.removeListener(
        this._beforeRequestListener
      )
    }
  }

  // Add listener that filters domains
  addListener() {
    chrome.webRequest.onBeforeRequest.addListener(
      this._beforeRequestListener,
      { urls: [URL_FILTER] },
      ['blocking']
    )
  }
}
