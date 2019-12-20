import React from 'react'
import styled from 'styled-components'

import Icon from '../components/icons'

export default function InfoPage() {
  return (
    <StyledInfoPage>
      <Group>
        <Icon name="CircleArrowLeft" style={{ fontSize: '32px' }} />
      </Group>
      <Group>
        <Heading>Google Domain Filter</Heading>
        <div>Version: 1.0</div>
      </Group>
      <Group>
        Developed by: <strong>Kyle Carhart</strong>
      </Group>
      <Group>
        <div>Connect with me below!</div>
        <div>
          <a href="https://github.com/kmcgamer">
            <Icon
              name="Github"
              style={{ fontSize: '24px', marginRight: '8px' }}
            />
          </a>
          <a href="https://twitter.com/KMCGamer">
            <Icon
              name="Twitter"
              style={{ fontSize: '24px', marginRight: '8px' }}
            />
          </a>
          <a href="https://www.linkedin.com/in/kyle-carhart">
            <Icon
              name="LinkedIn"
              style={{ fontSize: '24px', marginRight: '8px' }}
            />
          </a>
          <a href="mailto: KMCGamer@live.com">
            <Icon
              name="Mail"
              style={{ fontSize: '24px', marginRight: '8px' }}
            />
          </a>
        </div>
      </Group>
      <Light>If you like this app, drop a rating! Thanks!</Light>
    </StyledInfoPage>
  )
}

const StyledInfoPage = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
`

const Group = styled.div`
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
