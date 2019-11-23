// Object to manipulate URLs and their queries
export default class URLObject {
  constructor(url) {
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
  }

  _getQueryString() {
    const queryArray = []
    for (const [key, value] of Object.entries(this.queries)) {
      queryArray.push(key + '=' + value)
    }
    return queryArray.join('&')
  }

  toString() {
    return this.base + '?' + this._getQueryString()
  }
}
