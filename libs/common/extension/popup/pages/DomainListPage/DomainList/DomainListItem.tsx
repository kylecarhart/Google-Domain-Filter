import {
  remove,
  replace,
} from "@common/redux/features/domainList/domainListSlice";
import { RootState } from "@common/redux/store";
import { DragHandleIcon } from "@ui/icons";
import { isValidDomain } from "@utils/domain.util";
import { forwardRef, useContext, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { DomainListContext } from "../ListPage";
import DomainListItemDropdown from "./DomainListItemDropdown";
import DomainListItemEditOptions from "./DomainListItemEditOptions";
import DomainListItemInput from "./DomainListItemInput";

interface Props {
  domain: string;
  index: number;
  isDraggingOver: boolean;
}

type Ref = HTMLDivElement;
const DomainListItem = forwardRef<Ref, Props>(
  ({ domain, index, isDraggingOver }, ref) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const [inputText, setInputText] = useState(domain);
    const [isHovering, setIsHovering] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const { list, listType } = useContext(DomainListContext);

    const cancelEdit = () => {
      setInputText(domain);
      setIsEditing(false);
    };

    const startEdit = () => {
      setIsEditing(true);
      inputRef.current.focus();
      inputRef.current.setSelectionRange(-1, -1); // set cursor to end
    };

    const handleDeleteDomain = () => {
      dispatch(
        remove({
          domain,
          type: listType,
        })
      );
    };

    const handleEditDomain = () => {
      if (domain === inputText) {
        cancelEdit();
        return false;
      }

      if (domain === inputText) {
        return true;
      } else if (!isValidDomain(list, inputText)) {
        return false;
      }

      dispatch(
        replace({
          from: domain,
          to: inputText,
          type: listType,
        })
      );

      return true;
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
                  deleteDomain={() => handleDeleteDomain()}
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
