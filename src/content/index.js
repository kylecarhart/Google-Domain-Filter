import { toExcludeQuery } from '../utils';
import Observer from './Observer';

function storageChangeListener(storage) {
  let filterList = [];
  if (storage.filterList) {
    filterList = storage.filterList.newValue;
  }

  // Get all links on the page related to a google search
  document.querySelectorAll('.g .r > a').forEach((node) => {
    const closestNode = node.closest('.g');

    for (let i = 0; i < filterList.length; i++) {
      if (node.href.includes(filterList[i])) {
        closestNode.style.display = 'none';
        break;
      }
    }
  });
}

// Start google domain filtering script
(async function () {
  const storage = await browser.storage.sync.get('filterList');
  const filterList = storage.filterList || [];

  if (filterList.length === 0) {
    return; // No domains to filter, break out early.
  }

  const filterString = toExcludeQuery(...filterList);

  // Mutate google search as the DOM builds
  const observer = new Observer(filterString);
  observer.observe();

  document.addEventListener('DOMContentLoaded', () => {
    observer.disconnect();
  });

  // Remove filterString from title
  const title = document.querySelector('title');
  title.text = title.text.replace(` ${filterString}`, '');

  // Remove filterString from input
  const input = document.querySelector('input[name="q"]');
  input.value = input.value.substring(0, input.value.indexOf(filterString) - 1);

  // Listen for changes to domains
  browser.storage.onChanged.addListener(storageChangeListener);
})();
