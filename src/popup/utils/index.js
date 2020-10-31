export const ASC = true;
export const DESC = false;

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
