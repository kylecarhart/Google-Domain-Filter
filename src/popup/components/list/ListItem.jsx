import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SvgPencil, SvgClose, SvgTrash, SvgSave } from '../../icons';
import { Draggable } from 'react-beautiful-dnd';

function ListItem({ domain, deleteDomain, editDomain, index, isDraggable }) {
  const [inputText, setInputText] = useState(domain);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef();

  return (
    <Draggable draggableId={domain} index={index} isDragDisabled={!isDraggable}>
      {(provided) => (
        <StyledListItem
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}>
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
          <IconGroup>
            {isEditing ? (
              <IconGroup>
                <Icon
                  onClick={() => {
                    editDomain(domain, inputText);
                  }}>
                  <SvgSave />
                </Icon>
                <Icon
                  onClick={() => {
                    setIsEditing(false);
                  }}>
                  <SvgClose />
                </Icon>
              </IconGroup>
            ) : (
              <Icon
                onClick={() => {
                  setIsEditing(true);
                  inputRef.current.focus();
                }}>
                <SvgPencil />
              </Icon>
            )}
            <Icon
              onClick={() => {
                deleteDomain(domain);
              }}>
              <SvgTrash />
            </Icon>
          </IconGroup>
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
  isDraggable: PropTypes.bool.isRequired,
};

const StyledListItem = styled.li`
  display: flex;
  align-items: center;
  list-style: none;
  color: #333;
  font-size: 14px;
  padding: 8px 16px;
  border-bottom: 1px solid #f7f7f7;
  &:last-child {
    border: none;
  }
  background: #fff;
`;

const Input = styled.input`
  background: none;
  flex: 1;
  outline: none;
  border: none;
`;

const IconGroup = styled.div`
  display: flex;
`;

const Icon = styled.div`
  margin: 0px 8px;
  cursor: pointer;
  color: #ababab;
`;

export default ListItem;
