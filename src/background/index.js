import { tlds } from '../tlds.json';

/*
 * Handles redirecting google queries based on the filter list.
 */

(async function () {
  const storage = await browser.storage.sync.get('filterList');
  let filterList = storage.filterList || []; // default to empty array

  // Update domains when storage domains change
  browser.storage.onChanged.addListener((storage) => {
    if (storage.filterList) {
      filterList = storage.filterList.newValue;
    }
  });

  // Listen for google requests and redirect
  browser.webRequest.onBeforeRequest.addListener(
    (details) => {
      console.log('ran');

      // If there are no domains, don't bother redirecting
      if (filterList.length === 0) {
        return;
      }

      const url = new URL(details.url);
      const params = url.searchParams;
      const filterString = filterList
        .map((domain) => `-site:${domain}`)
        .join(' ');

      // Add the sites to the query if it doesn't contain them already
      // This avoids the infinite request loop.
      if (!filterList.every((domain) => params.get('q').includes(domain))) {
        params.set('q', `${params.get('q')} ${filterString}`);
      } else {
        return;
      }

      return {
        redirectUrl: url.toString(), // Redirect
      };
    },
    { urls: tlds.map((tld) => `*://*.google.${tld}/search?*`) },
    ['blocking']
  );
})();
