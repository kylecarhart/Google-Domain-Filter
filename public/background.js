// Listen for google search requests and inject site blacklist
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    let urlObject = new URLObject(details.url)

    // Escape from redirect if query already contains blacklisted link
    if (urlObject.queries.q.includes(encodeURI('-site:github.com'))) {
      return
    }

    urlObject.queries.q +=
      '+' +
      encodeURI('-site:github.com') +
      '+' +
      encodeURI('-site:dominos.com') +
      '+' +
      encodeURI('-site:pizzahut.com') +
      '+' +
      encodeURI('-site:papajohns.com') +
      '+' +
      encodeURI('-site:marcos.com')

    return {
      redirectUrl: urlObject.toString()
    }
  },
  { urls: ['*://*.google.com/search?*'] },
  ['blocking']
)

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
