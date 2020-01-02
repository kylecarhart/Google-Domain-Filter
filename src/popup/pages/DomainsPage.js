import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Icon from '../components/icons'
import InputWithButton from '../components/input/InputWithButton'
import Table from '../components/table/Table'
import Tip from '../components/tip/Tip'
import useStorage from '../hooks/useStorage'
import { DOMAIN_STORAGE_KEY } from '../../DomainRepository'

export default function DomainsPage({ setPage }) {
  const [domains, setDomains] = useStorage(DOMAIN_STORAGE_KEY, [])

  return (
    <StyledDomainsPage>
      <h1 style={{ display: 'none' }}>Domains Input Page</h1>
      <StyledSmallHeader htmlFor="domain-input">Domain</StyledSmallHeader>
      <StyledInputWithButton
        btnClick={input => {
          if (!domains.includes(input)) {
            setDomains([input, ...domains])
            return true
          }
        }}
        placeholder="Enter Domains"
        inputId="domain-input"
        inputName="domain-input"
      />
      <StyledSmallHeader>Filtered Domains</StyledSmallHeader>
      {domains.length > 0 ? (
        <Table
          entries={domains}
          handleDelete={domain =>
            setDomains(domains.filter(elem => elem !== domain))
          }
          handleSave={(idx, domain) => {
            if (!domains.includes(domain)) {
              setDomains(
                domains.map((elem, _idx) => (idx === _idx ? domain : elem))
              )
              return true
            }
          }}
        />
      ) : (
        <Tip
          text="Enter a domain to start filtering"
          style="warn"
          icon={<StyledIcon name="Info" />}
        />
      )}
      <StyledInfoIcon
        onClick={() => setPage('InfoPage')}
        aria-label="Go to info page"
      >
        <Icon name="Info" />
      </StyledInfoIcon>
    </StyledDomainsPage>
  )
}

DomainsPage.propTypes = {
  setPage: PropTypes.func.isRequired
}

const StyledDomainsPage = styled.div`
  background: #eeeeee;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: stretch;
  padding: 32px;
`

const StyledSmallHeader = styled.label`
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

const StyledInfoIcon = styled.button`
  background: none;
  border: none;
  line-height: 0;
  position: absolute;
  right: 16px;
  bottom: 16px;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
`
