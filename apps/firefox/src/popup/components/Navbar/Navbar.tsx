import { CogIcon } from "@ui/icons";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import browser from "webextension-polyfill";
import NavItem from "./NavItem";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Nav>
      <NavLink to="/" style={{ flex: 1 }}>
        {({ isActive }) => (
          <StyledNavItem
            tipText="Remove search results containing domains in this list."
            selected={isActive}
            onClick={() => {
              navigate("/");
            }}
          >
            Filter List
          </StyledNavItem>
        )}
      </NavLink>
      <NavLink to="/preferenceList" style={{ flex: 1 }}>
        {({ isActive }) => (
          <StyledNavItem
            tipText="Prioritize search results from domains in this list (order matters!)"
            selected={isActive}
            onClick={() => {
              navigate("/preferenceList");
            }}
          >
            Preference List
          </StyledNavItem>
        )}
      </NavLink>
      <OptionNavItem
        onClick={() => {
          browser.runtime.openOptionsPage();
        }}
      >
        <CogIcon />
      </OptionNavItem>
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
`;

const StyledNavItem = styled(NavItem)`
  flex: 1;
`;

const OptionNavItem = styled(NavItem)`
  width: 40px;
`;

export default Navbar;
