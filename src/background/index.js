(async function () {
  const storage = await browser.storage.sync.get('domains');
  let domains = storage.domains || []; // default to empty array

  // Update domains when storage domains change
  browser.storage.onChanged.addListener((storage) => {
    if (storage.domains) {
      domains = storage.domains.newValue;
    }
  });

  // Listen for google requests and redirect
  browser.webRequest.onBeforeRequest.addListener(
    (details) => {
      // If there are no domains, don't bother redirecting
      if (domains.length === 0) {
        return;
      }

      const url = new URL(details.url);
      const params = url.searchParams;
      const filterString = domains.map((domain) => `-site:${domain}`).join(' ');

      // Add the sites to the query if it doesn't contain them already
      // This avoids the infinite request loop.
      if (!domains.every((domain) => params.get('q').includes(domain))) {
        params.set('q', `${params.get('q')} ${filterString}`);
      }

      return {
        redirectUrl: url.toString(), // Redirect
      };
    },
    { urls: ['*://*.google.com/search?*'] },
    ['blocking']
  );
})();
