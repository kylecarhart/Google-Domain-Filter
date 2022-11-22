import { reorder } from "@common/extension/popup/features/filterList/domainListSlice";
import { createRef, useContext } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { DomainListContext } from "../ListPage";
import DomainListItem from "./DomainListItem";

interface Props {}

function DomainList({}: Props) {
  const dispatch = useDispatch();

  const { list, listType } = useContext(DomainListContext);

  const refMappedList = list.map((domain) => ({
    domain,
    ref: createRef<HTMLDivElement>(),
  }));

  function onDragEnd(result: DropResult) {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    } else if (destination.index === source.index) {
      return;
    }

    dispatch(
      reorder({
        domain: draggableId,
        from: source.index,
        to: destination.index,
        type: listType,
      })
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided, snapshot) => (
          <StyledList ref={provided.innerRef} {...provided.droppableProps}>
            {refMappedList.map(({ domain, ref }, idx) => (
              <DomainListItem
                ref={ref}
                key={domain}
                index={idx}
                domain={domain}
                isDraggingOver={snapshot.isDraggingOver}
              />
            ))}
            {provided.placeholder}
          </StyledList>
        )}
      </Droppable>
    </DragDropContext>
  );
}

const StyledList = styled.ul`
  padding: 0;
  margin: 8px 0px 0px 0px;
  border-radius: 3px;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.1);
  flex: 1 1 auto;
  overflow-y: auto;
  height: 0px;
`;

export default DomainList;
