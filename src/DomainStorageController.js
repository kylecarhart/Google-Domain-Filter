export const DOMAINS_STORAGE_LOCATION = 'entries'

export default class DomainStorageController {
  constructor() {}

  // Add a domain to storage
  static async addDomain(domain) {
    let domains = await DomainStorageController.getDomains()
    domains.push(domain)
    return chrome.storage.sync.set({
      [DOMAINS_STORAGE_LOCATION]: domains
    })
  }

  // Remove a domain from storage
  static async removeDomain(index) {
    let domains = await DomainStorageController.getDomains()
    return chrome.storage.sync.set({
      [DOMAINS_STORAGE_LOCATION]: domains.filter((_, _idx) => index !== _idx)
    })
  }

  // Edit a domain in storage by index
  static async editDomain(index, domain) {
    let domains = await DomainStorageController.getDomains()
    return chrome.storage.sync.set({
      [DOMAINS_STORAGE_LOCATION]: domains.map((entry, _idx) => {
        return index === _idx ? domain : entry
      })
    })
  }

  static getDomains() {
    return new Promise(resolve => {
      chrome.storage.sync.get(DOMAINS_STORAGE_LOCATION, function(result) {
        resolve(result[DOMAINS_STORAGE_LOCATION])
      })
    })
  }
}
