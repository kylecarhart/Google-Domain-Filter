import RequestListenerController from '../RequestListenerController'
import DomainStorageController, {
  DOMAINS_STORAGE_LOCATION
} from '../DomainStorageController'

const runApp = async () => {
  const requestController = new RequestListenerController()

  // On first run, initialize the storage
  await new Promise((resolve, reject) => {
    chrome.runtime.onInstalled.addListener(function(details) {
      switch (details.reason) {
        case 'install':
          console.log('Extension installed!')
          DomainStorageController.initializeStorage().then(() => {
            resolve()
          })
          break
        case 'update':
          console.log('Extension updated!')
          resolve()
          break
        default:
          resolve()
          break
      }
    })
  })

  // Start the request listener
  let domains = await DomainStorageController.getDomains()
  requestController.domains = domains
  requestController.addListener()

  // When entries are added to storage, reset the listener
  const changeListener = changes => {
    // if changes weren't made to the entires, escape
    if (!changes[DOMAINS_STORAGE_LOCATION]) {
      return
    }

    const domains = changes[DOMAINS_STORAGE_LOCATION].newValue

    // Remove the old listener and replace it with a new one
    requestController.domains = domains
  }

  chrome.storage.onChanged.addListener(changeListener)
}

runApp()
