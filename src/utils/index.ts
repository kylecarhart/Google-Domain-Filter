const EXCLUDE_QUERY = "-site";
const INCLUDE_QUERY = "+site";

export const ASC = true;
export const DESC = false;

type DomainList = string[];

/**
 * Converts an array of domain strings into a single exclusion domain query string.
 * @param {...string} domains
 * @return {string} A domain exclusion query string.
 */
export function toExcludeQuery(...domains: DomainList) {
  return domains.map((domain) => `${EXCLUDE_QUERY}:${domain}`).join(" ");
}

/**
 * Converts an array of domain strings into a single inclusion domain query string.
 * @param {...string} domains
 * @return {string} A domain inclusion query string.
 */
export function toIncludeQuery(...domains: DomainList) {
  return domains.map((domain) => `${INCLUDE_QUERY}:${domain}`).join(" ");
}

/**
 * Sort an array of strings lexicographically while ignoring case.
 * @param {[string]} arr - An array of strings.
 * @param {boolean} dir - Direction. Default true for ascending.
 */
export function sortLexIgnoreCase(arr: string[], dir = ASC) {
  return [...arr].sort(function (a, b) {
    if (a.toUpperCase() < b.toUpperCase()) {
      return dir ? -1 : 1;
    } else if (a.toUpperCase() > b.toUpperCase()) {
      return dir ? 1 : -1;
    }
    return 0;
  });
}

/**
 * Searches an array of strings and replaces all occurances of from with to.
 * @param {[string]} arr  - An array of strings.
 * @param {string} from - The string you want to change from.
 * @param {string} to - The string you want to change to.
 */
export function replaceStringInArray(arr: string[], from: string, to: string) {
  return arr.map((str) => {
    if (str === from) {
      return to;
    }
    return str;
  });
}

/**
 * Escapes a string for safe use within a RegExp constructor.
 * @param {string} str - Input string.
 */
export function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
/**
 * Retrieve all results from xpath query.
 * @param {string} xpath String of XPath query.
 * @param {Node} parent Parent node to search from. Default is document.
 */
export function getElementsByXPath(xpath: string, parent: Node) {
  let results = [];
  let query = document.evaluate(
    xpath,
    parent || document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
  for (let i = 0, length = query.snapshotLength; i < length; ++i) {
    results.push(query.snapshotItem(i));
  }
  return results;
}
