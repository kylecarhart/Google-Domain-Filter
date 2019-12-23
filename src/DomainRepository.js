import { get } from './StorageAPI'

export const DOMAIN_STORAGE_KEY = 'domains'

export function getDomains() {
  return get(DOMAIN_STORAGE_KEY).then(
    res => res[DOMAIN_STORAGE_KEY],
    rej => {
      console.log(rej)
      return []
    }
  )
}
