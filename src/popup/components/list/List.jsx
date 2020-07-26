import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ListItem from './ListItem';

function List({ domains }) {
  return (
    <StyledList>
      {domains.map((domain) => (
        <ListItem key={domain} domain={domain} />
      ))}
    </StyledList>
  );
}

List.propTypes = {
  domains: PropTypes.arrayOf(PropTypes.string),
};

const StyledList = styled.ul`
  padding: 0;
  margin: 0;
`;

export default List;
