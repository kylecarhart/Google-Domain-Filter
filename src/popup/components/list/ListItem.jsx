import React, { useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import { CloseIcon, DragHandleIcon, SaveIcon } from '../../icons';
import { Draggable } from 'react-beautiful-dnd';
import ListItemOptions from './ListItemOptions';
import { IconButton } from '../button';
import DomainContext from '../../context/DomainContext';
import validator from 'validator';

function ListItem({ domain, index, isDragEnabled, isDraggingOver }, ref) {
  const [domainList, setDomainList] = useContext(DomainContext);

  const [inputText, setInputText] = useState(domain);
  const [isHovering, setIsHovering] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef(null);

  const cancelEdit = () => {
    setInputText(domain);
    setIsEditing(false);
  };

  const startEdit = () => {
    setIsEditing(true);
    inputRef.current.focus();
  };

  const editDomain = () => {
    if (domain === inputText) {
      return;
    }
    if (validator.isFQDN(inputText) && !domainList.includes(inputText)) {
      setDomainList((domainList) => {
        return domainList.map((_domain) => {
          if (_domain === domain) {
            return inputText;
          } else {
            return _domain;
          }
        });
      });
    }
  };

  return (
    <Draggable draggableId={domain} index={index} isDragDisabled={!isDragEnabled}>
      {(provided, snapshot) => (
        <div ref={ref}>
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
                  editDomain();
                }
              }}
              onDoubleClick={() => {
                startEdit();
                inputRef.current.setSelectionRange(-1, -1); // set cursor to end
              }}
            />
            {isEditing && (
              <>
                <StyledIconButton
                  onClick={() => {
                    editDomain();
                  }}>
                  <SaveIcon />
                </StyledIconButton>
                <StyledIconButton
                  onClick={() => {
                    cancelEdit();
                  }}>
                  <CloseIcon />
                </StyledIconButton>
              </>
            )}

            <ListItemOptions
              domain={domain}
              showTrigger={isHovering && !isDraggingOver}
              startEdit={startEdit}
              cancelEdit={cancelEdit}
              isEditing={isEditing}
            />

            {isDragEnabled && (
              <DragHandle {...provided.dragHandleProps}>
                <DragHandleIcon />
              </DragHandle>
            )}
          </StyledListItem>
        </div>
      )}
    </Draggable>
  );
}

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

const StyledIconButton = styled(IconButton)`
  color: #ababab;
`;

export default React.forwardRef(ListItem);
