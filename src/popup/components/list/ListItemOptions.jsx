import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from '../dropdown';
import styled from 'styled-components';
import { MoreIcon } from '../../icons';
import { IconButton } from '../button';

function ListItemOptions({ isEditing, startEdit, deleteDomain, cancelEdit, showTrigger }) {
  const editOption = {
    text: 'Edit',
    onClick: () => {
      startEdit();
    },
  };

  const cancelEditOption = {
    text: 'Cancel Edit',
    onClick: () => {
      cancelEdit();
    },
  };

  const deleteOption = {
    text: 'Delete',
    onClick: () => {
      deleteDomain();
    },
  };

  return (
    <Dropdown
      trigger={(isMenuShowing) => (
        <StyledIconButton isVisible={showTrigger || isMenuShowing}>
          <MoreIcon />
        </StyledIconButton>
      )}
      items={[isEditing ? cancelEditOption : editOption, deleteOption]}
    />
  );
}

ListItemOptions.propTypes = {
  startEdit: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  deleteDomain: PropTypes.func.isRequired,
  showTrigger: PropTypes.bool.isRequired,
};

const StyledIconButton = styled(IconButton)`
  color: #ababab;
  font-size: 18px;

  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
`;

export default ListItemOptions;
