import { escapeRegExp } from "../utils";

const MAIN_RESULT_WRAPPER_ID = "rso";
const LINK_QUERY_SELECTOR = ".yuRUbf a";
const ACCEPTABLE_SEARCH_RESULT_CLASSES = ["g", "hlcw0c"];

/**
 * Loop through results and call matchCallback() on each match. If no match,
 * optionally call noMatchCallback().
 * @param {[string] | string} input - Domain input. Can be an array or single string.
 * @param {function(HTMLElement)} matchCallback - Callback function on match.
 * @param {function(HTMLElement)} noMatchCallback - Callback function on no match.
 */
function handleResults(
  input: string | string[],
  matchCallback: (elem: Element) => void,
  noMatchCallback = (elem: Element) => {}
) {
  let domains = Array.isArray(input) ? input : [input];

  /**
   * Associate the search result hostname with its greatest ancestor element contained
   * in the main search results wrapper.
   */
  let results = Array.from(
    document.getElementById(MAIN_RESULT_WRAPPER_ID).children
  )
    .filter((child) => {
      if (
        ACCEPTABLE_SEARCH_RESULT_CLASSES.some((cssClass) =>
          child.classList.contains(cssClass)
        )
      ) {
        return true;
      }
    })
    .map((child, index) => {
      let link = child.querySelector<HTMLAnchorElement>(LINK_QUERY_SELECTOR);
      if (link) {
        let resultElement = {
          hostname: link.hostname,
          elem: child,
          originalPos: index,
        };

        return resultElement;
      }
    });

  /**
   * Elements are sorted to account for preference list positions, but in reverse
   * order. This allows for the callback to simply bring the currently processed
   * element to the top of the stack so the last element to be processed would actually
   * be first in the search results.
   *
   * This has no effect the filter list.
   */
  results.sort((a, b) => {
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

  /**
   * For each result DOM element, check if hostname matches domain in the list
   * and call the appropriate callback function.
   */
  results.forEach((result) => {
    const domain = domains.find((domain) =>
      getDomainRegExp(domain).test(result.hostname)
    );

    if (domain) {
      matchCallback(result.elem);
    } else {
      noMatchCallback(result.elem);
    }
  });
}

/**
 * Hide search results matching domain input.
 * @param {[string] | string} input - Domain input. Can be an array or single string.
 */
function filterResults(input: string | string[]) {
  handleResults(
    input,
    (element) => {
      setResultElementFiltered(element);
    },
    (element) => {
      setResultElementUnfiltered(element);
    }
  );
}

/**
 * Highlight and reorder search results matching domain input.
 * @param {[string] | string} input - Domain input. Can be an array or single string.
 */
function preferResults(input: string | string[]) {
  handleResults(
    input,
    (element) => {
      const rso = document.getElementById(MAIN_RESULT_WRAPPER_ID);
      rso.prepend(element);
      setResultElementPreferred(element);
    },
    (element) => {
      setResultElementUnpreferred(element);
    }
  );
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
 * @param anchorElement
 * @returns the closest matching HTMLElement parent or null.
 */
function getParentResultElement(anchorElement: HTMLAnchorElement) {
  if (anchorElement.parentElement.className !== "yuRUbf") {
    return null;
  }

  return anchorElement.closest<HTMLElement>("#rso > .g, #rso > .hlcw0c");
}

/**
 * Set the element to hidden using "data-filter" attribute
 * @param elem
 */
function setResultElementFiltered(elem: Element) {
  elem.setAttribute("data-filter", "");
}

/**
 * Set the element to unhidden using "data-filter" attribute
 * @param elem
 */
function setResultElementUnfiltered(elem: Element) {
  elem.removeAttribute("data-filter");
}

/**
 * Set the element to preferred using "data-preference" attribute
 * @param elem
 */
function setResultElementPreferred(elem: Element) {
  elem.setAttribute("data-preference", "");
}

/**
 * Set the element to unpreferred using "data-preference" att
 * @param elem
 */
function setResultElementUnpreferred(elem: Element) {
  elem.removeAttribute("data-preference");
}

export {
  removeFromInput,
  removeFromTitle,
  filterResults,
  preferResults,
  getDomainRegExp,
  getParentResultElement,
  setResultElementFiltered,
};
