import RequestListenerController from '../RequestListenerController'
import { getDomains, DOMAIN_STORAGE_KEY } from '../DomainRepository'

// Run the application in the background
;(async () => {
  const requestController = new RequestListenerController()

  // Start the request listener
  requestController.domains = await getDomains()
  requestController.addListener()

  // When domains are changed, update them in the requestController
  const changeListener = changes => {
    if (!changes[DOMAIN_STORAGE_KEY]) {
      return
    }
    requestController.domains = changes[DOMAIN_STORAGE_KEY].newValue
  }

  chrome.storage.onChanged.addListener(changeListener)
})()
