import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ListItem from './ListItem';

function List({ domains, deleteDomain, editDomain }) {
  return (
    <StyledList>
      {domains.map((domain) => (
        <ListItem
          key={domain}
          domain={domain}
          deleteDomain={deleteDomain}
          editDomain={editDomain}
        />
      ))}
    </StyledList>
  );
}

List.propTypes = {
  domains: PropTypes.arrayOf(PropTypes.string),
  deleteDomain: PropTypes.func.isRequired,
  editDomain: PropTypes.func.isRequired,
};

const StyledList = styled.ul`
  padding: 0;
  margin: 8px 0px;
  border-radius: 2px;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.1);
  height: 190px;
  overflow-y: scroll;
`;

export default List;
