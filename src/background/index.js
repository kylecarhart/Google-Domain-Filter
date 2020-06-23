import { STORAGE_DOMAINS_KEY, QUERY_PARAM_NAME } from '../core/constants';

(async () => {
  let domains = await browser.storage.sync
    .get(STORAGE_DOMAINS_KEY)
    .then((storage) => {
      return storage[STORAGE_DOMAINS_KEY];
    });

  /**
   * Listen for google requests and redirect
   */
  browser.webRequest.onBeforeRequest.addListener(
    (details) => {
      // If there are no domains, don't bother redirecting
      if (domains.length === 0) {
        return;
      }

      const url = new URL(details.url);
      const params = url.searchParams;

      // Add the sites to the query if it doesn't contain them already
      if (!domains.every((domain) => params.get('q').includes(domain))) {
        const domainString = domains
          .map((domain) => `-site:${domain}`)
          .join(' ');
        params.set('q', `${params.get('q')} ${domainString}`);
      }

      // Pass the domains along in a separate query param if the url doesn't already have them
      if (!params.get(QUERY_PARAM_NAME)) {
        params.set(QUERY_PARAM_NAME, domains.join(' '));
      } else {
        return; // Escape the redirect otherwise
      }

      return {
        redirectUrl: url.toString(), // Redirect
      };
    },
    { urls: ['*://*.google.com/search?*'] },
    ['blocking']
  );

  /**
   *  Update domains when storage domains change
   */
  browser.storage.onChanged.addListener((changes) => {
    if (!changes[STORAGE_DOMAINS_KEY]) {
      return;
    }
    domains = changes[STORAGE_DOMAINS_KEY].newValue;
  });
})();
