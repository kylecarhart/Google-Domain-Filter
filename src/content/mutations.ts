import { escapeRegExp } from "../utils";

const MAIN_RESULT_WRAPPER_ID = "rso";
const LINK_QUERY_SELECTOR = ".yuRUbf a";

interface SearchResult {
  hostname: string;
  originalPos: number;
  element: Element;
}

/**
 * Hide search results matching domain input.
 * @param {[string] | string} domainInput - Domain input. Can be an array or single string.
 */
function filterResults(domainInput: string | string[]) {
  let domains = Array.isArray(domainInput) ? domainInput : [domainInput];
  let searchResults = getSearchResults();

  searchResults.forEach((result) => {
    const domain = domains.find((domain) =>
      getDomainRegExp(domain).test(result.hostname)
    );

    if (domain) {
      setResultElementAsFiltered(result.element);
    } else {
      setResultElementAsUnfiltered(result.element);
    }
  });
}

/**
 * Highlight and reorder search results matching domain input.
 * @param {[string] | string} domainInput - Domain input. Can be an array or single string.
 */
function preferResults(domainInput: string | string[]) {
  let domains = Array.isArray(domainInput) ? domainInput : [domainInput];
  let searchResults = getSearchResults();
  sortSearchResultsForPreferenceHandling(searchResults, domains);

  searchResults.forEach((result) => {
    const domain = domains.find((domain) =>
      getDomainRegExp(domain).test(result.hostname)
    );

    if (domain) {
      const rso = document.getElementById(MAIN_RESULT_WRAPPER_ID);
      rso.prepend(result.element);
      setResultElementAsPreferred(result.element);
    } else {
      setResultElementAsUnpreferred(result.element);
    }
  });
}

/**
 * Get search result objects from the DOM.
 * @returns array of search result objects
 */
function getSearchResults(): SearchResult[] {
  return Array.from(document.getElementById(MAIN_RESULT_WRAPPER_ID).children)
    .filter((result) =>
      // filter out elements that dont have links
      result.querySelector<HTMLAnchorElement>(LINK_QUERY_SELECTOR)
    )
    .map((child, index) => {
      // Associate the hostname with its greatest ancestor element
      return {
        hostname:
          child.querySelector<HTMLAnchorElement>(LINK_QUERY_SELECTOR).hostname,
        element: child,
        originalPos: index,
      } as SearchResult;
    });
}

/**
 * Elements are sorted to account for preference list positions, but in reverse
 * order. This allows for the callback to simply bring the currently processed
 * element to the top of the stack so the last element to be processed would actually
 * be first in the search results.
 *
 * @param searchResultObjects search result objects
 * @param domains domain strings to sort against
 */
function sortSearchResultsForPreferenceHandling(
  searchResultObjects: SearchResult[],
  domains: string[]
): void {
  searchResultObjects.sort((a, b) => {
    let aIdx = domains.findIndex((domain) =>
      getDomainRegExp(domain).test(a.hostname)
    );
    let bIdx = domains.findIndex((domain) =>
      getDomainRegExp(domain).test(b.hostname)
    );

    if (aIdx > bIdx) {
      return -1;
    } else if (aIdx < bIdx) {
      return 1;
    } else {
      // When the hosts match, take into considderation their original ranks
      if (a.originalPos > b.originalPos) {
        return -1;
      } else {
        return 1;
      }
    }
  });
}

/**
 * Remove a string from the browser title
 * @param {string} string
 */
function removeFromTitle(string: string) {
  const title = document.querySelector("title");
  title.text = title.text.replace(string, "");
}

/**
 * Remove a string from the google search input
 * @param {string} string
 */
function removeFromInput(string: string) {
  const input = document.querySelector<HTMLInputElement>('input[name="q"]');
  if (input.value.includes(string)) {
    input.value = input.value.substring(0, input.value.indexOf(string) - 1);
  }
}

/**
 * Generate a regular expression for domain comparison.
 * @param {string} domain - Domain to generate RegExp from.
 */
function getDomainRegExp(domain: string) {
  const escapedString = escapeRegExp(domain);
  return new RegExp(`^(?:.+\\.)?${escapedString}$`);
}

/**
 * Find the parent search result element of an anchor tag.
 * The div "#rso" contains all search result groups. Return the outermost element
 * containing the anchor that is a direct child of #rso.
 * @param anchorElement
 * @returns the outermost element containing the anchor that is a direct child
 *          of #rso.
 */
function getParentResultElement(anchorElement: HTMLAnchorElement) {
  if (anchorElement.parentElement.className !== "yuRUbf") {
    return null;
  }

  const eldestElement = anchorElement.closest<HTMLElement>("#rso > *");
  return eldestElement;
}

/**
 * Set the element to hidden using "data-filter" attribute
 * @param elem
 */
function setResultElementAsFiltered(elem: Element) {
  elem.setAttribute("data-filter", "");
}

/**
 * Set the element to unhidden using "data-filter" attribute
 * @param elem
 */
function setResultElementAsUnfiltered(elem: Element) {
  elem.removeAttribute("data-filter");
}

/**
 * Set the element to preferred using "data-preference" attribute
 * @param elem
 */
function setResultElementAsPreferred(elem: Element) {
  elem.setAttribute("data-preference", "");
}

/**
 * Set the element to unpreferred using "data-preference" att
 * @param elem
 */
function setResultElementAsUnpreferred(elem: Element) {
  elem.removeAttribute("data-preference");
}

export {
  removeFromInput,
  removeFromTitle,
  filterResults,
  preferResults,
  getDomainRegExp,
  getParentResultElement,
  setResultElementAsFiltered,
};
