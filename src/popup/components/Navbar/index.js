import React from "react";
import PropTypes from "prop-types";
import NavItem from "./NavItem";
import styled from "styled-components";
import { FILTER_LIST_NAV, PREFERENCE_LIST_NAV } from "../../constants";

const Navbar = ({ selected, setSelected }) => {
  return (
    <Nav>
      <StyledNavItem
        text="Blacklist"
        navId={FILTER_LIST_NAV}
        tipText="Remove search results containing domains in this list."
        selected={selected === FILTER_LIST_NAV}
        setSelected={setSelected}
      />
      <StyledNavItem
        text="Preference list"
        navId={PREFERENCE_LIST_NAV}
        tipText="Prioritize search results from domains in this list (order matters!)"
        selected={selected === PREFERENCE_LIST_NAV}
        setSelected={setSelected}
      />
    </Nav>
  );
};

Navbar.propTypes = {
  selected: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
};

const Nav = styled.nav`
  display: flex;
`;

const StyledNavItem = styled(NavItem)`
  flex: 1;
`;

export default Navbar;
