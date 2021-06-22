import styled from "styled-components";
import DomainListItem from "./DomainListItem";
import {
  Droppable,
  DragDropContext,
  DropResult,
  DraggableLocation,
} from "react-beautiful-dnd";
import { createRef } from "react";

interface Props {
  domains: string[];
  deleteDomain: (domain: string) => void;
  editDomain: (fromDomain: string, toDomain: string) => boolean;
  reorderDomains: (
    domain: string,
    source: DraggableLocation,
    destination: DraggableLocation
  ) => void;
}

function DomainList({
  domains,
  deleteDomain,
  editDomain,
  reorderDomains,
}: Props) {
  const testList = domains.map((domain) => ({
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

    reorderDomains(draggableId, source, destination);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={"list"}>
        {(provided, snapshot) => (
          <StyledList ref={provided.innerRef} {...provided.droppableProps}>
            {testList.map(({ domain, ref }, idx) => (
              <DomainListItem
                ref={ref}
                key={domain}
                index={idx}
                domain={domain}
                isDraggingOver={snapshot.isDraggingOver}
                deleteDomain={deleteDomain}
                editDomain={editDomain}
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
