const EXCLUDE_QUERY = '-site';
const INCLUDE_QUERY = '+site';

export const ASC = true;
export const DESC = false;

/**
 * Converts an array of domain strings into a single exclusion domain query string.
 * @param {...string} domains
 * @return {string} A domain exclusion query string.
 */
export function toExcludeQuery(...domains) {
  return domains.map((domain) => `${EXCLUDE_QUERY}:${domain}`).join(' ');
}

/**
 * Converts an array of domain strings into a single inclusion domain query string.
 * @param {...string} domains
 * @return {string} A domain inclusion query string.
 */
export function toIncludeQuery(...domains) {
  return domains.map((domain) => `${INCLUDE_QUERY}:${domain}`).join(' ');
}

/**
 * Sort an array of strings lexicographically while ignoring case.
 * @param {[string]} list - An array of strings.
 * @param {boolean} dir - Direction. Default true for ascending.
 */
export function sortLexIgnoreCase(list, dir = ASC) {
  return [...list].sort(function (a, b) {
    if (a.toUpperCase() < b.toUpperCase()) {
      return dir ? -1 : 1;
    } else if (a.toUpperCase() > b.toUpperCase()) {
      return dir ? 1 : -1;
    }
    return 0;
  });
}
