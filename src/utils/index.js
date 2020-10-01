const EXCLUDE_QUERY = '-site';
const INCLUDE_QUERY = '+site';

/**
 * Converts an array of domain strings into a single exclusion domain query string.
 * @param {...string} domains
 * @return {string} A domain exclusion query string.
 */
function toExcludeQuery(...domains) {
  return domains.map((domain) => `${EXCLUDE_QUERY}:${domain}`).join(' ');
}

/**
 * Converts an array of domain strings into a single inclusion domain query string.
 * @param {...string} domains
 * @return {string} A domain inclusion query string.
 */
function toIncludeQuery(...domains) {
  return domains.map((domain) => `${INCLUDE_QUERY}:${domain}`).join(' ');
}

export { toExcludeQuery, toIncludeQuery };
