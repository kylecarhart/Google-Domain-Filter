import { escapeRegExp } from "lodash";

const MAIN_RESULT_WRAPPER_ID = "rso";
const LINK_QUERY_SELECTOR = ".yuRUbf a";

interface SearchResult {
  hostname: string;
  originalPos: number;
  element: Element;
}

/**
 * Hide search results matching domain input.
 */
function filterResults(domainInput: string | string[]) {
  const domains = Array.isArray(domainInput) ? domainInput : [domainInput];
  const searchResults = getSearchResults();

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
 */
function preferResults(domainInput: string | string[]) {
  const domains = Array.isArray(domainInput) ? domainInput : [domainInput];
  const searchResults = getSearchResults();
  sortSearchResultsForPreferenceHandling(searchResults, domains);

  searchResults.forEach((result) => {
    const domain = domains.find((domain) =>
      getDomainRegExp(domain).test(result.hostname)
    );

    if (domain) {
      const rso = document.getElementById(MAIN_RESULT_WRAPPER_ID);

      if (!rso) {
        return;
      }

      rso.prepend(result.element);
      setResultElementAsPreferred(result.element);
    } else {
      setResultElementAsUnpreferred(result.element);
    }
  });
}

/**
 * Get search result objects from the DOM.
 */
function getSearchResults(): SearchResult[] {
  const wrapperElement = document.getElementById(MAIN_RESULT_WRAPPER_ID);

  if (!wrapperElement) {
    return [];
  }

  return Array.from(wrapperElement.children)
    .filter((result) =>
      // Filter out elements that dont have links
      result.querySelector<HTMLAnchorElement>(LINK_QUERY_SELECTOR)
    )
    .map((child, index) => {
      const anchorElement =
        child.querySelector<HTMLAnchorElement>(LINK_QUERY_SELECTOR);

      // Associate the hostname with its greatest ancestor element
      return {
        hostname: anchorElement ? anchorElement.hostname : "",
        element: child,
        originalPos: index,
      };
    });
}

/**
 * Elements are sorted to account for preference list positions, but in reverse
 * order. This allows for the callback to simply bring the currently processed
 * element to the top of the stack so the last element to be processed would actually
 * be first in the search results.
 */
function sortSearchResultsForPreferenceHandling(
  searchResultObjects: SearchResult[],
  domains: string[]
): void {
  searchResultObjects.sort((a, b) => {
    const aIdx = domains.findIndex((domain) =>
      getDomainRegExp(domain).test(a.hostname)
    );
    const bIdx = domains.findIndex((domain) =>
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
 */
function removeFromTitle(string: string) {
  const title = document.querySelector("title");

  if (!title) {
    return;
  }

  title.text = title.text.replace(string, "");
}

/**
 * Remove a string from the google search input
 */
function removeFromInput(string: string) {
  const input = document.querySelector<HTMLInputElement>('input[name="q"]');

  if (!input) {
    return;
  }

  if (input.value.includes(string)) {
    input.value = input.value.substring(0, input.value.indexOf(string) - 1);
  }
}

/**
 * Generate a regular expression for domain comparison.
 */
function getDomainRegExp(domain: string) {
  const escapedString = escapeRegExp(domain);
  return new RegExp(`^(?:.+\\.)?${escapedString}$`);
}

/**
 * Find the parent search result element of an anchor tag.
 * The div "#rso" contains all search result groups. Return the outermost element
 * containing the anchor that is a direct child of #rso.
 */
function getParentResultElement(anchorElement: HTMLAnchorElement) {
  const parentElement = anchorElement.parentElement;

  if (!parentElement || parentElement.className !== "yuRUbf") {
    return null;
  }

  const eldestElement = anchorElement.closest<HTMLElement>("#rso > *");
  return eldestElement;
}

/**
 * Set the element to hidden using "data-filter" attribute
 */
function setResultElementAsFiltered(elem: Element) {
  elem.setAttribute("data-filter", "");
}

/**
 * Set the element to unhidden using "data-filter" attribute
 */
function setResultElementAsUnfiltered(elem: Element) {
  elem.removeAttribute("data-filter");
}

/**
 * Set the element to preferred using "data-preference" attribute
 */
function setResultElementAsPreferred(elem: Element) {
  elem.setAttribute("data-preference", "");
}

/**
 * Set the element to unpreferred using "data-preference" att
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
