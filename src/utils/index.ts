import { DomainList } from "../types";

/**
 * Converts an array of domain strings into a single exclusion domain query string.
 * @param {...string} domains
 * @return {string} A domain exclusion query string.
 */
export function toExcludeQuery(domains: DomainList) {
  return domains.map((domain) => `-site:${domain}`).join(" ");
}

/**
 * Converts an array of domain strings into a single inclusion domain query string.
 * @param {...string} domains
 * @return {string} A domain inclusion query string.
 */
export function toIncludeQuery(domains: DomainList) {
  return domains.map((domain) => `+site:${domain}`).join(" ");
}

/**
 * Sort an array of strings lexicographically while ignoring case.
 * @param {[string]} arr - An array of strings.
 * @param {boolean} sortDir - Direction. Default true for ascending.
 */
export function sortLexIgnoreCase(
  arr: string[],
  sortDir: "asc" | "desc" = "asc"
) {
  const dir = sortDir === "asc" ? 1 : -1;
  return [...arr].sort(function (a, b) {
    if (a.toUpperCase() > b.toUpperCase()) {
      return dir;
    } else if (a.toUpperCase() < b.toUpperCase()) {
      return -dir;
    } else {
      if (a > b) {
        return dir;
      } else if (a < b) {
        return -dir;
      } else {
        return 0;
      }
    }
  });
}

/**
 * Searches an array of strings and replaces all occurances of from with to.
 * @param {[string]} arr  - An array of strings.
 * @param {string} from - The string you want to change from.
 * @param {string} to - The string you want to change to.
 */
export function replaceInArray(arr: any[], from: any, to: any) {
  return arr.map((obj) => {
    if (obj === from) {
      return to;
    }
    return obj;
  });
}

/**
 * Escapes a string for safe use within a RegExp constructor.
 * @param {string} str - Input string.
 */
export function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
