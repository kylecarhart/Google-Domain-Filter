import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DragHandleIcon } from '../../icons';
import { Draggable } from 'react-beautiful-dnd';
function ListItem({ domain, deleteDomain, editDomain, index, isDragDisabled }) {
  const [inputText, setInputText] = useState(domain);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef();

  return (
    <Draggable
      draggableId={domain}
      index={index}
      isDragDisabled={isDragDisabled}>
      {(provided, snapshot) => (
        <StyledListItem
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}>
          <Input
            ref={inputRef}
            value={inputText}
            readOnly={!isEditing}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                editDomain(domain, inputText);
              }
            }}
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
};

const StyledListItem = styled.li`
  display: flex;
  align-items: center;
  list-style: none;
  color: #333;
  font-size: 14px;
  padding: 8px 16px;
  border-bottom: ${(props) => (props.isDragging ? '' : '1px solid #f7f7f7')};
  background: #fff;
  box-shadow: ${(props) =>
    props.isDragging ? '0px 0px 15px rgba(0,0,0,.1)' : 'none'};
  &:last-child {
    border: none;
  }
`;

const Input = styled.input`
  background: none;
  flex: 1;
  outline: none;
  border: none;
`;

const DragHandle = styled.div`
  color: #bbb;
`;

export default ListItem;
