import { forwardRef, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { DragHandleIcon } from "@ui/icons";
import DomainListItemDropdown from "./DomainListItemDropdown";
import DomainListItemEditOptions from "./DomainListItemEditOptions";
import DomainListItemInput from "./DomainListItemInput";

interface Props {
  domain: string;
  index: number;
  isDraggingOver: boolean;
  editDomain: (fromDomain: string, toDomain: string) => boolean;
  deleteDomain: (domain: string) => void;
}

type Ref = HTMLDivElement;
const DomainListItem = forwardRef<Ref, Props>(
  ({ domain, index, isDraggingOver, editDomain, deleteDomain }, ref) => {
    const [inputText, setInputText] = useState(domain);
    const [isHovering, setIsHovering] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const cancelEdit = () => {
      setInputText(domain);
      setIsEditing(false);
    };

    const startEdit = () => {
      setIsEditing(true);
      inputRef.current.focus();
      inputRef.current.setSelectionRange(-1, -1); // set cursor to end
    };

    const handleEditDomain = () => {
      if (domain === inputText) {
        cancelEdit();
        return false;
      }
      return editDomain(domain, inputText);
    };

    return (
      <Draggable draggableId={domain} index={index}>
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
              }}
            >
              <DomainListItemInput
                ref={inputRef}
                text={inputText}
                setText={(input: string) => {
                  setInputText(input);
                }}
                isEditing={isEditing}
                startEdit={startEdit}
                editDomain={() => {
                  handleEditDomain();
                }}
              />

              {isEditing ? (
                <DomainListItemEditOptions
                  cancelEdit={cancelEdit}
                  editDomain={() => {
                    handleEditDomain();
                  }}
                />
              ) : (
                <DomainListItemDropdown
                  domain={domain}
                  showTrigger={isHovering && !isDraggingOver}
                  startEdit={startEdit}
                  deleteDomain={deleteDomain}
                />
              )}

              <DragHandle {...provided.dragHandleProps}>
                <DragHandleIcon />
              </DragHandle>
            </StyledListItem>
          </div>
        )}
      </Draggable>
    );
  }
);

interface StyledListItemProps {
  isDragging: boolean;
}
const StyledListItem = styled.li<StyledListItemProps>`
  display: flex;
  align-items: center;
  list-style: none;
  color: #333;
  font-size: 14px;
  padding: 8px 16px;
  border-bottom: ${({ isDragging }) => (isDragging ? "" : "1px solid #f7f7f7")};
  background: #fff;
  box-shadow: ${({ isDragging }) =>
    isDragging ? "0px 0px 15px rgba(0,0,0,.1)" : "none"};

  &:last-child {
    border: none;
  }
`;

const DragHandle = styled.div`
  color: #bbb;
  margin: 0 8px;
`;

export default DomainListItem;
