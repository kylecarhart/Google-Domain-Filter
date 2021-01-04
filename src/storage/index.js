import * as daos from "./dao";

export function getAll() {
  return browser.storage.sync.get(null);
}

export default { ...daos, getAll };
