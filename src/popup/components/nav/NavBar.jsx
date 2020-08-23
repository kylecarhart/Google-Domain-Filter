import React from 'react';
import PropTypes from 'prop-types';
import { NavButton } from '.';
import styled from 'styled-components';

const NavBar = ({ selected, setSelected }) => {
  return (
    <Nav>
      <NavButton
        text="Blacklist"
        navId="filterList"
        tipText="Remove search results containing domains in this list."
        selected={selected === 'filterList'}
        setSelected={setSelected}
      />
      <NavButton
        text="Preference list"
        navId="preferenceList"
        tipText="Prioritize search results from domains in this list."
        selected={selected === 'preferenceList'}
        setSelected={setSelected}
      />
    </Nav>
  );
};

NavBar.propTypes = {
  selected: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
};

const Nav = styled.nav`
  display: flex;
`;

export default NavBar;
