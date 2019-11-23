import RequestListenerController from '../RequestListenerController'
import DomainStorageController, {
  DOMAINS_STORAGE_LOCATION
} from '../DomainStorageController'

const requestListener = new RequestListenerController()

// Start the request listener
DomainStorageController.getDomains().then(result => {
  if (result) {
    requestListener.addListener(result)
  }
})

// When entries are added to storage, reset the listener
const changeListener = changes => {
  // if changes werent made to the entires, escape
  if (!changes[DOMAINS_STORAGE_LOCATION]) {
    return
  }

  const domains = changes[DOMAINS_STORAGE_LOCATION].newValue

  // Remove the old listener and replace it with a new one
  requestListener.removeListener()
  requestListener.addListener(domains)
}

chrome.storage.onChanged.addListener(changeListener)
