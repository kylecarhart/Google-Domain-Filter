import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DragHandleIcon, MoreIcon } from '../../icons';
import { Draggable } from 'react-beautiful-dnd';
import { useOutsideClick } from '../../hooks';
import { usePopper } from 'react-popper';

function ListItem({
  domain,
  deleteDomain,
  editDomain,
  index,
  isDragDisabled,
  isDraggingOver,
}) {
  const [inputText, setInputText] = useState(domain);
  const [isHovering, setIsHovering] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [isShowing, setIsShowing] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

  useOutsideClick(popperElement, () => {
    setIsShowing(false);
  });

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
      {
        name: 'hide',
      },
    ],
  });

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
                editDomain(domain, inputText);
              }
            }}
          />
          {((isHovering && !isDraggingOver) || isShowing) && (
            <>
              <MoreButtonWrapper
                type="button"
                ref={setReferenceElement}
                onClick={() => {
                  setIsShowing(true);
                }}>
                <MoreIcon />
              </MoreButtonWrapper>

              {isShowing && (
                <Menu
                  ref={setPopperElement}
                  style={styles.popper}
                  {...attributes.popper}>
                  <MenuOption
                    onClick={() => {
                      setIsEditing(true);
                      setIsShowing(false);
                    }}>
                    Edit
                  </MenuOption>
                  <MenuOption
                    onClick={() => {
                      deleteDomain();
                    }}>
                    Delete
                  </MenuOption>
                </Menu>
              )}
            </>
          )}

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
  height: 18px;
`;

const DragHandle = styled.div`
  color: #bbb;
`;

const MoreButtonWrapper = styled.button`
  color: #ababab;
  font-size: 18px;
  margin: 0 8px 0 0;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  line-height: 0;
`;

const Menu = styled.ul`
  background: #fff;
  color: #000;
  border-radius: 3px;
  padding: 0;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 20px rgba(0, 0, 0, 0.1);

  &[data-popper-reference-hidden='true'] {
    visibility: hidden;
    pointer-events: none;
  }
`;

const MenuOption = styled.li`
  padding: 10px 55px 10px 13px;
  list-style: none;
  margin: 0;
  cursor: pointer;

  &:hover {
    background: #318bf5;
    color: white;
  }

  &:first-child {
    border-radius: 3px 3px 0px 0px;
  }

  &:last-child {
    border-radius: 0px 0px 3px 3px;
  }
`;

export default ListItem;
