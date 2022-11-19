import { CogIcon } from "@ui/icons";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import browser from "webextension-polyfill";
import NavItem from "./NavItem";

const Navbar = () => {
  return (
    <Nav>
      <StyledNavLink to="/">
        {({ isActive }) => (
          <NavItem
            tipText="Remove search results containing domains in this list."
            selected={isActive}
          >
            Filter List
          </NavItem>
        )}
      </StyledNavLink>
      <StyledNavLink to="/preferenceList">
        {({ isActive }) => (
          <NavItem
            tipText="Prioritize search results from domains in this list (order matters!)"
            selected={isActive}
          >
            Preference List
          </NavItem>
        )}
      </StyledNavLink>
      <OptionsNavItem
        onClick={() => {
          browser.runtime.openOptionsPage();
          window.close(); // Close the popup
        }}
      >
        <CogIcon />
      </OptionsNavItem>
    </Nav>
  );
};

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;

const Nav = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
`;

const OptionsNavItem = styled(NavItem)`
  width: 40px;
`;

export default Navbar;
