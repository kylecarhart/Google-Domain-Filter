import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ListItem from './ListItem';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';
import DomainContext from '../../context/DomainContext';
import validator from 'validator';

function List({ isDragEnabled }) {
  const [domainList, setDomainList] = useContext(DomainContext);

  function onDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    } else if (destination.index === source.index) {
      return;
    }

    reorderDomains(draggableId, source, destination);
  }

  const deleteDomain = (domain) => {
    setDomainList(domainList.filter((_domain) => _domain !== domain));
  };

  const editDomain = (fromDomain, toDomain) => {
    if (fromDomain === toDomain) {
      return;
    }
    if (validator.isFQDN(toDomain) && !domainList.includes(toDomain)) {
      setDomainList((filterList) => {
        return filterList.map((domain) => {
          if (domain === fromDomain) {
            return toDomain;
          } else {
            return domain;
          }
        });
      });
    }
  };

  const reorderDomains = (domain, source, destination) => {
    setDomainList((oldList) => {
      const tempList = Array.from(oldList);
      tempList.splice(source.index, 1);
      tempList.splice(destination.index, 0, domain);
      return tempList;
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={'list'}>
        {(provided, snapshot) => (
          <StyledList ref={provided.innerRef} {...provided.droppableProps}>
            {domainList.map((domain, idx) => (
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
                isDragEnabled={isDragEnabled}
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
  isDragEnabled: PropTypes.bool.isRequired,
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
