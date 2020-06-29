import React, { useState } from 'react';
import { NavButton } from '.';
import styled from 'styled-components';

const NavBar = () => {
  const [selected, setSelected] = useState('Blacklist');

  return (
    <Nav>
      <NavButton
        text="Blacklist"
        tipText={
          <HelpText>
            Your <b>blacklist</b> will remove search results containing domains
            in this list.
          </HelpText>
        }
        selected={selected === 'Blacklist'}
        onClick={(selection) => {
          setSelected(selection);
        }}
      />
      <NavButton
        text="Preference list"
        selected={selected === 'Preference list'}
        tipText={
          <HelpText>
            Your <b>preference list</b> will prioritize search results from
            domains in this list.
          </HelpText>
        }
        onClick={(selection) => {
          setSelected(selection);
        }}
      />
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
`;

const HelpText = styled.span`
  color: white;
  font-size: 0.75rem;
`;
export default NavBar;
