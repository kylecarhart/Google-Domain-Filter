import RequestListenerController from '../RequestListenerController'
import { get } from '../useStorage'

const runApp = async () => {
  const requestController = new RequestListenerController()

  // Start the request listener
  let domains = await get('domains')
  requestController.domains = domains ? domains : []
  requestController.addListener()

  // When entries are added to storage, reset the listener
  const changeListener = changes => {
    // if changes weren't made to the entires, escape
    if (!changes.domains) {
      return
    }

    const domains = changes.domains.newValue

    // Remove the old listener and replace it with a new one
    requestController.domains = domains
  }

  chrome.storage.onChanged.addListener(changeListener)
}

runApp()
