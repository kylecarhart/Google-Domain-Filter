import { DomainList } from "@globalTypes";

/**
 * Converts an array of domain strings into a single exclusion domain query string.
 */
export function toExcludeQuery(domains: DomainList) {
  return domains.map((domain) => `-site:${domain}`).join(" ");
}

/**
 * Converts an array of domain strings into a single inclusion domain query string.
 */
export function toIncludeQuery(domains: DomainList) {
  return domains.map((domain) => `+site:${domain}`).join(" ");
}

/**
 * Sort an array of strings lexicographically while ignoring case.
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
 */
export function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
