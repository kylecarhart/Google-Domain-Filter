import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DragHandleIcon, MoreIcon } from '../../icons';
import { Draggable } from 'react-beautiful-dnd';
import { Dropdown, DropdownMenu, DropdownMenuItem } from '../dropdown/';
import ListItemOptions from './ListItemOptions';

function ListItem({ domain, deleteDomain, editDomain, index, isDragDisabled, isDraggingOver }) {
  const [inputText, setInputText] = useState(domain);
  const [isHovering, setIsHovering] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef(null);

  return (
    <Draggable draggableId={domain} index={index} isDragDisabled={isDragDisabled}>
      {(provided, snapshot) => (
        <StyledListItem
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          onMouseEnter={() => {
            setIsHovering(true);
          }}
          onMouseLeave={() => {
            setIsHovering(false);
          }}>
          <Input
            ref={inputRef}
            value={inputText}
            readOnly={!isEditing}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                editDomain(inputText);
              }
            }}
          />

          <ListItemOptions
            setIsEditing={setIsEditing}
            inputRef={inputRef}
            deleteDomain={deleteDomain}
            isHovering={isHovering}
            isDraggingOver={isDraggingOver}
          />

          {!isDragDisabled && (
            <DragHandle {...provided.dragHandleProps}>
              <DragHandleIcon />
            </DragHandle>
          )}
        </StyledListItem>
      )}
    </Draggable>
  );
}

ListItem.propTypes = {
  domain: PropTypes.string.isRequired,
  deleteDomain: PropTypes.func.isRequired,
  editDomain: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isDragDisabled: PropTypes.bool.isRequired,
  isDraggingOver: PropTypes.bool.isRequired,
};

const StyledListItem = styled.li`
  display: flex;
  align-items: center;
  list-style: none;
  color: #333;
  font-size: 14px;
  padding: 8px 16px;
  border-bottom: ${({ isDragging }) => (isDragging ? '' : '1px solid #f7f7f7')};
  background: #fff;
  box-shadow: ${({ isDragging }) => (isDragging ? '0px 0px 15px rgba(0,0,0,.1)' : 'none')};

  &:last-child {
    border: none;
  }
`;

const Input = styled.input`
  flex: 1;
  height: 18px;

  &:read-only {
    outline: none;
    background: none;
    border: none;
  }
`;

const DragHandle = styled.div`
  color: #bbb;
  margin: 0 8px;
`;

export default ListItem;
