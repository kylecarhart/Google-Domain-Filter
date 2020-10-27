import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from '../dropdown';
import styled from 'styled-components';
import { MoreIcon } from '../../icons';

function ListItemOptions({ isEditing, setIsEditing, inputRef, deleteDomain, isHovering, isDraggingOver, cancelEdit }) {
  const editOption = {
    text: 'Edit',
    onClick: () => {
      setIsEditing(true);
      inputRef.current.focus();
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
        <MoreButtonWrapper isVisible={(isHovering && !isDraggingOver) || isMenuShowing}>
          <MoreIcon />
        </MoreButtonWrapper>
      )}
      items={[isEditing ? cancelEditOption : editOption, deleteOption]}
    />
  );
}

ListItemOptions.propTypes = {
  setIsEditing: PropTypes.func.isRequired,
  inputRef: PropTypes.object.isRequired,
  deleteDomain: PropTypes.func.isRequired,
  isHovering: PropTypes.bool.isRequired,
  isDraggingOver: PropTypes.bool.isRequired,
};

const MoreButtonWrapper = styled.button`
  color: #ababab;
  font-size: 18px;
  margin: 0 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  line-height: 0;

  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
`;

export default ListItemOptions;
