import React from "react";
import PropTypes from "prop-types";
import Dropdown from "../../Dropdown";
import styled from "styled-components";
import { MoreIcon } from "../../../icons";
import { IconButton } from "../../Button";

function DomainListItemDropdown({
  domain,
  startEdit,
  showTrigger,
  setDomains,
}) {
  const editOption = {
    text: "Edit",
    onClick: () => {
      startEdit();
    },
  };

  const deleteOption = {
    text: "Delete",
    onClick: () => {
      setDomains((oldDomains) =>
        oldDomains.filter((_domain) => _domain !== domain)
      );
    },
  };

  return (
    <Dropdown
      trigger={(isMenuShowing) => (
        <StyledIconButton isVisible={showTrigger || isMenuShowing}>
          <MoreIcon />
        </StyledIconButton>
      )}
      items={[editOption, deleteOption]}
    />
  );
}

DomainListItemDropdown.propTypes = {
  domain: PropTypes.string.isRequired,
  startEdit: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  showTrigger: PropTypes.bool.isRequired,
  setDomains: PropTypes.func.isRequired,
};

const StyledIconButton = styled(IconButton)`
  color: #ababab;
  font-size: 18px;

  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
`;

export default DomainListItemDropdown;
