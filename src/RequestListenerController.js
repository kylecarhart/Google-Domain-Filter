export const URL_FILTER = '*://*.google.com/search?*'
export const QUERY_PARAM_NAME = 'gdf'

// Manages a single request listener
export default class RequestListenerController {
  constructor(domains = []) {
    this._beforeRequestListener = this._beforeRequestListener.bind(this)
    this.domains = domains
  }

  // Request listener handles appending domains to the search query
  _beforeRequestListener(details) {
    // If there are no domains, don't bother redirecting
    if (this.domains.length === 0) {
      return
    }

    let url = new URL(details.url)

    // Add the sites to the query if it doesn't contain them already
    if (!this.domains.every(elem => url.searchParams.get('q').includes(elem))) {
      // Modify the search query exclude blacklisted domains
      url.searchParams.set(
        'q',
        url.searchParams.get('q') +
          ' ' +
          this.domains.map(elem => `-site:${elem}`).join(' ')
      )
    }

    // Pass the domains along in a separate query param if the url doesn't already have them
    if (!url.searchParams.get(QUERY_PARAM_NAME)) {
      url.searchParams.set(QUERY_PARAM_NAME, this.domains.join(' '))
      console.log(url.toString())
    } else {
      return // Escape the redirect otherwise
    }

    return {
      redirectUrl: url.toString() // Redirect
    }
  }

  // Remove the listener
  removeListener() {
    if (this.hasListener()) {
      chrome.webRequest.onBeforeRequest.removeListener(
        this._beforeRequestListener
      )
    }
  }

  // Add listener that filters domains
  addListener() {
    if (!this.hasListener())
      chrome.webRequest.onBeforeRequest.addListener(
        this._beforeRequestListener,
        { urls: [URL_FILTER] },
        ['blocking']
      )
  }

  // Check for listener
  hasListener() {
    return chrome.webRequest.onBeforeRequest.hasListener(
      this._beforeRequestListener
    )
  }
}
