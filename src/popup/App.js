import React, { useState } from 'react'
import Table from './components/table/Table'
import DomainStorageController, {
  DOMAINS_STORAGE_LOCATION
} from '../DomainStorageController'
import InputWithButton from './components/input/InputWithButton'
import Tip from './components/tip/Tip'
import Icon from './components/icons'
import styled from 'styled-components'

const regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9]+([-.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

export default function App() {
  const [domains, setDomains] = useState([])

  const changeListener = change => {
    // Check if entries were changed (and not some other part of storage
    if (change[DOMAINS_STORAGE_LOCATION]) {
      setDomains(change[DOMAINS_STORAGE_LOCATION].newValue)
    }
  }

  /* 
    On component mount, load the domains from chrome storage.
  */
  React.useEffect(() => {
    DomainStorageController.getDomains()
      .then(domains => {
        setDomains(domains)
      })
      .catch(e => {
        console.log(e)
      })

    // Listen for chrome storage changes and update UI accordingly
    chrome.storage.onChanged.addListener(changeListener)

    // On cleanup, remove the listener
    return () => {
      chrome.storage.onChanged.removeListener(changeListener)
    }
  }, [])

  return (
    <StyledApp>
      <StyledSmallHeader>Domain</StyledSmallHeader>
      <StyledInputWithButton
        btnClick={input => DomainStorageController.createDomain(input)}
        placeholder="Enter Domains"
        isValid={input =>
          input && regex.test(input) && !domains.includes(input)
        }
      />
      <StyledSmallHeader>Filtered Domains</StyledSmallHeader>
      {domains.length > 0 ? (
        <Table
          entries={domains}
          handleDelete={DomainStorageController.deleteDomain}
          handleSave={(idx, domain) =>
            DomainStorageController.updateDomain(idx, domain)
          }
        />
      ) : (
        <Tip
          text="Enter a domain to start filtering"
          style="warn"
          icon={<StyledIcon name="Info" />}
        />
      )}
    </StyledApp>
  )
}

const StyledApp = styled.div`
  background: #eeeeee;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: stretch;
  padding: 32px;
`

const StyledSmallHeader = styled.div`
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.035em;
  margin-bottom: 8px;
  color: #707070;
`

const StyledInputWithButton = styled(InputWithButton)`
  margin-bottom: 16px;
`

const StyledIcon = styled(Icon)`
  line-height: 0;
  font-size: 1rem;
`
