import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { IconButton } from "../../Button";
import { SaveIcon, CloseIcon } from "../../../icons";

function DomainListItemEditOptions({ editDomain, cancelEdit, ...props }) {
  return (
    <>
      <StyledIconButton
        onClick={() => {
          editDomain();
        }}
      >
        <SaveIcon />
      </StyledIconButton>
      <StyledIconButton
        onClick={() => {
          cancelEdit();
        }}
      >
        <CloseIcon />
      </StyledIconButton>
    </>
  );
}

const StyledIconButton = styled(IconButton)`
  color: #ababab;
`;

DomainListItemEditOptions.propTypes = {
  editDomain: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
};

export default DomainListItemEditOptions;
