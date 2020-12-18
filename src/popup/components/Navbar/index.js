import React from "react";
import PropTypes from "prop-types";
import NavItem from "./NavItem";
import styled from "styled-components";

const Navbar = ({ selected, setSelected }) => {
  return (
    <Nav>
      <StyledNavItem
        text="Blacklist"
        navId="filterList"
        tipText="Remove search results containing domains in this list."
        selected={selected === "filterList"}
        setSelected={setSelected}
      />
      <StyledNavItem
        text="Preference list"
        navId="preferenceList"
        tipText="Prioritize search results from domains in this list (order matters!)"
        selected={selected === "preferenceList"}
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
