import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ListItem from './ListItem';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';

function List({
  domains,
  deleteDomain,
  editDomain,
  reorderDomains,
  isDragDisabled,
}) {
  function onDragEnd(result) {
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
      <Droppable droppableId={'list'}>
        {(provided, snapshot) => (
          <StyledList ref={provided.innerRef} {...provided.droppableProps}>
            {domains.map((domain, idx) => (
              <ListItem
                key={domain}
                index={idx}
                domain={domain}
                deleteDomain={() => {
                  deleteDomain(domain);
                }}
                editDomain={(newDomain) => {
                  editDomain(domain, newDomain);
                }}
                isDragDisabled={isDragDisabled}
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

List.propTypes = {
  domains: PropTypes.arrayOf(PropTypes.string),
  deleteDomain: PropTypes.func.isRequired,
  editDomain: PropTypes.func.isRequired,
  reorderDomains: PropTypes.func.isRequired,
  isDragDisabled: PropTypes.bool.isRequired,
};

const StyledList = styled.ul`
  padding: 0;
  margin: 8px 0px;
  border-radius: 3px;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.1);
  flex: 1 1 auto;
  overflow-y: auto;
  height: 0px;
`;

export default List;
