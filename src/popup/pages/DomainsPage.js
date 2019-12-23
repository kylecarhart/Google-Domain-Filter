import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Icon from '../components/icons'
import InputWithButton from '../components/input/InputWithButton'
import Table from '../components/table/Table'
import Tip from '../components/tip/Tip'
import useStorage from '../hooks/useStorage'

const regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9]+([-.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

export default function DomainsPage({ setPage }) {
  const [domains, setDomains] = useStorage('domains', [])

  const validateInput = input => {
    return input && regex.test(input) && !domains.includes(input)
  }

  return (
    <StyledDomainsPage>
      <StyledSmallHeader>Domain</StyledSmallHeader>
      <StyledInputWithButton
        btnClick={input => {
          if (validateInput(input)) {
            setDomains([input, ...domains])
            return true
          }
        }}
        placeholder="Enter Domains"
      />
      <StyledSmallHeader>Filtered Domains</StyledSmallHeader>
      {domains.length > 0 ? (
        <Table
          entries={domains}
          handleDelete={domain =>
            setDomains(domains.filter(elem => elem !== domain))
          }
          handleSave={(idx, domain) => {
            if (validateInput(domain)) {
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
      <StyledInfoIcon name="Info" onClick={() => setPage('InfoPage')} />
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

const StyledInfoIcon = styled(Icon)`
  position: absolute;
  right: 16px;
  bottom: 16px;
  font-size: 16px;
  color: #333;

  &:hover {
    cursor: pointer;
  }
`
