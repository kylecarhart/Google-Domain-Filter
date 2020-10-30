import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ListItem from './ListItem';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';
import DomainContext from '../../context/DomainContext';
import { usePrevious } from '../../hooks';

function List({ isDragEnabled }) {
  const [domainList, setDomainList] = useContext(DomainContext);
  const prevDomainList = usePrevious(domainList);

  const testList = domainList.map((domain) => ({
    domain,
    ref: React.createRef(),
  }));

  // Scroll to the domain added
  useEffect(() => {
    if (testList.length - prevDomainList.length === 1) {
      let diff = domainList.filter((domain) => !prevDomainList.includes(domain))[0];
      testList[domainList.indexOf(diff)].ref.current.scrollIntoView();
    }
  }, [prevDomainList, testList, domainList]);

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
            {testList.map(({ domain, ref }, idx) => (
              <ListItem
                ref={ref}
                key={domain}
                index={idx}
                domain={domain}
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
  isDragEnabled: PropTypes.bool.isRequired,
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

export default List;
