import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import DomainListItem from "./DomainListItem";
import { Droppable, DragDropContext } from "react-beautiful-dnd";

function DomainList({ domains, setDomains }) {
  const testList = domains.map((domain) => ({
    domain,
    ref: React.createRef(),
  }));

  function onDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    } else if (destination.index === source.index) {
      return;
    }

    reorderDomains(draggableId, source, destination);
  }

  const reorderDomains = (domain, source, destination) => {
    setDomains((oldList) => {
      const tempList = Array.from(oldList);
      tempList.splice(source.index, 1);
      tempList.splice(destination.index, 0, domain);
      return tempList;
    });
  };

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
                setDomains={setDomains}
              />
            ))}
            {provided.placeholder}
          </StyledList>
        )}
      </Droppable>
    </DragDropContext>
  );
}

DomainList.propTypes = {
  domains: PropTypes.arrayOf(PropTypes.string).isRequired,
  setDomains: PropTypes.func.isRequired,
};

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
