import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from '.';
import { Draggable } from 'react-beautiful-dnd';

function DraggableListItem({ domain, index, isDragDisabled }) {
  return (
    <Draggable
      draggableId={domain}
      index={index}
      isDragDisabled={isDragDisabled}>
      {(provided, snapshot) => (
        <ListItem
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        />
      )}
    </Draggable>
  );
}

DraggableListItem.propTypes = {};

export default DraggableListItem;
