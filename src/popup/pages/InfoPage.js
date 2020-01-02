import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Icon from '../components/icons'

export default function InfoPage({ setPage }) {
  return (
    <StyledInfoPage>
      <InvisibleAriaElement as="h1">Info Page</InvisibleAriaElement>
      <InfoGroup>
        <StyledIcon size="32px" onClick={() => setPage('DomainsPage')}>
          <Icon name="CircleArrowLeft" />
        </StyledIcon>
      </InfoGroup>
      <InfoGroup>
        <Heading>Google Domain Filter</Heading>
        <div>Version: 1.0</div>
      </InfoGroup>
      <InfoGroup>
        Developed by: <strong>Kyle Carhart</strong>
      </InfoGroup>
      <InfoGroup>
        <div>Connect with me below!</div>
        <div>
          <StyledIconLink size="24px" href="https://github.com/kmcgamer">
            <Icon name="Github" />
          </StyledIconLink>
          <StyledIconLink size="24px" href="https://twitter.com/TwoNineTwo_">
            <Icon name="Twitter" />
          </StyledIconLink>
          <StyledIconLink
            size="24px"
            href="https://www.linkedin.com/in/kyle-carhart"
          >
            <Icon name="LinkedIn" />
          </StyledIconLink>
          <StyledIconLink size="24px" href="mailto: KMCGamer@live.com">
            <Icon name="Mail" />
          </StyledIconLink>
        </div>
      </InfoGroup>
      <Light>If you like this app, drop a rating! Thanks!</Light>
    </StyledInfoPage>
  )
}

InfoPage.propTypes = {
  setPage: PropTypes.func.isRequired
}

const StyledInfoPage = styled.div`
  background: #eeeeee;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  padding: 32px;
`

const InfoGroup = styled.div`
  margin-bottom: 16px;
  color: #333;
  font-size: 14px;
`

const Heading = styled.div`
  font-size: 18px;
  font-weight: 600;
`

const Light = styled.div`
  font-style: italic;
  color: #7e7e7e;
  font-size: 14px;
`

const StyledIcon = styled.button`
  background: none;
  border: none;
  line-height: 0;
  color: inherit;
  font-size: ${props => props.size};
  cursor: pointer;
  padding: 0;
`

const StyledIconLink = styled.a`
  font-size: ${props => props.size};
  &:hover {
    cursor: pointer;
  }
  margin-right: 8px;

  &:link {
    color: #333;
  }

  &:visited {
    color: #333;
  }

  &:hover {
    color: #1e90ff;
  }
`
const InvisibleAriaElement = styled.div`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`
