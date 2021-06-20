import NavItem from "./NavItem";
import styled from "styled-components";
import { FILTER_LIST_NAV, PREFERENCE_LIST_NAV } from "../../constants";
import { CogIcon } from "../../icons";
import { browser } from "webextension-polyfill-ts";

interface Props {
  selected: string;
  setSelected: (key: string) => void;
}

const Navbar = ({ selected, setSelected }: Props) => {
  return (
    <Nav>
      <StyledNavItem
        tipText="Remove search results containing domains in this list."
        selected={selected === FILTER_LIST_NAV}
        onClick={() => {
          setSelected(FILTER_LIST_NAV);
        }}
      >
        Filter List
      </StyledNavItem>
      <StyledNavItem
        tipText="Prioritize search results from domains in this list (order matters!)"
        selected={selected === PREFERENCE_LIST_NAV}
        onClick={() => {
          setSelected(PREFERENCE_LIST_NAV);
        }}
      >
        Preference List
      </StyledNavItem>
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
