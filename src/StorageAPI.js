/*
 * @param {string} keyValue -
 * @return {Promise} resolves to keyValue, otherwise rejects on error
 */
export function set(items) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set(items, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError.string);
      } else {
        resolve(items);
      }
    });
  });
}

/*
 * @param {(string|string[]|object)} keys - one key, multiple keys, or a dictionary of keys with initial values
 * @return {Promise} resolves to response, otherwise rejects on error
 */
export function get(keys) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(keys, (res) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError.string);
      } else {
        resolve(res);
      }
    });
  });
}
