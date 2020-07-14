export const FILTER_LIST_STORAGE_KEY = 'filter_list';

async function getAllDomains() {
  try {
    let storage = await browser.storage.sync.get(FILTER_LIST_STORAGE_KEY);
    let domains = storage[FILTER_LIST_STORAGE_KEY];
    return domains ? domains : [];
  } catch (error) {
    console.log(error);
  }
}

async function setDomains(domains) {
  try {
    await browser.storage.sync.set({ [FILTER_LIST_STORAGE_KEY]: domains });
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
