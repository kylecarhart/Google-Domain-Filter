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
export function replaceInArray<T>(arr: T[], from: T, to: T) {
  return arr.map((obj) => {
    if (obj === from) {
      return to;
    }
    return obj;
  });
}
