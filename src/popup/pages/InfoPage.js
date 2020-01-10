import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Icon from '../components/icons'

export default function InfoPage({ setPage }) {
  return (
    <StyledInfoPage>
      <InvisibleAriaElement as="h1">Info Page</InvisibleAriaElement>
      <StyledIcon size="32px" onClick={() => setPage('DomainsPage')}>
        <Icon name="CircleArrowLeft" />
      </StyledIcon>
      <InfoGroup>
        <Heading>Google Domain Filter</Heading>
        <div>Version 1.0.0</div>
      </InfoGroup>
      <InfoGroup>
        Developed by: <strong>Kyle Carhart</strong>
      </InfoGroup>
      <InfoGroup>
        <div>Connect with me below!</div>
        <List>
          <li>
            <StyledIconLink size="24px" href="https://github.com/kmcgamer">
              <Icon name="Github" />
            </StyledIconLink>
          </li>
          <li>
            <StyledIconLink size="24px" href="https://twitter.com/TwoNineTwo_">
              <Icon name="Twitter" />
            </StyledIconLink>
          </li>
          <li>
            <StyledIconLink
              size="24px"
              href="https://www.linkedin.com/in/kyle-carhart"
            >
              <Icon name="LinkedIn" />
            </StyledIconLink>
          </li>
          <li>
            <StyledIconLink size="24px" href="mailto: KMCGamer@live.com">
              <Icon name="Mail" />
            </StyledIconLink>
          </li>
        </List>
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
  align-items: flex-start;
  padding: 2rem;
`

const InfoGroup = styled.div`
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 14px;
`

const Heading = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`

const Light = styled.em`
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
  margin-bottom: 1rem;

  &:hover {
    color: #555;
  }
`

const StyledIconLink = styled.a`
  font-size: ${props => props.size};
  cursor: pointer;
  margin-right: 8px;
  display: inline-block;
  line-height: 0;

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

const List = styled.div`
  list-style: none;
  > li {
    display: inline-block;
  }
`
