import React, { useState } from 'react';
import { NavButton } from '.';
import styled from 'styled-components';

const NavBar = () => {
  const [selected, setSelected] = useState('Blacklist');

  return (
    <Nav>
      <NavButton
        text="Blacklist"
        tipText="Remove search results containing domains in this list."
        selected={selected === 'Blacklist'}
        onClick={(selection) => {
          setSelected(selection);
        }}
      />
      <NavButton
        text="Preference list"
        tipText="Prioritize search results from domains in this list."
        selected={selected === 'Preference list'}
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

export default NavBar;
