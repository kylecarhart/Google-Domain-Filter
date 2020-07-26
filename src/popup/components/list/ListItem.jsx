import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function ListItem({ domain }) {
  return <StyledListItem>{domain}</StyledListItem>;
}

ListItem.propTypes = {
  domain: PropTypes.string.isRequired,
};

const StyledListItem = styled.li`
  list-style: none;
`;

export default ListItem;
