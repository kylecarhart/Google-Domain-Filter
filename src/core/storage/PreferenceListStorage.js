export const PREFERENCE_LIST_STORAGE_KEY = 'preference_list';

async function getAllDomains() {
  try {
    let storage = await browser.storage.sync.get(PREFERENCE_LIST_STORAGE_KEY);
    let domains = storage[PREFERENCE_LIST_STORAGE_KEY];
    return domains;
  } catch (error) {
    console.log(error);
  }
}

async function setDomains(domains) {
  try {
    await browser.storage.sync.set({ [PREFERENCE_LIST_STORAGE_KEY]: domains });
  } catch (error) {
    console.log(error);
  }
}

async function addDomain(domain) {
  try {
    let domains = await getAllDomains();
    domains.push(domain);
    await setDomains(domains);
  } catch (error) {
    console.log(error);
  }
}

async function removeDomain(domain) {
  try {
    let domains = await getAllDomains();
    domains = domains.filter((elem) => elem !== domain);
    await setDomains(domains);
  } catch (error) {
    console.log(error);
  }
}

export default {
  getAllDomains,
  setDomains,
  addDomain,
  removeDomain,
};
