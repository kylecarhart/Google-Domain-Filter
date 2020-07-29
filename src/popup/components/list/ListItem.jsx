import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SvgPencil, SvgClose, SvgTrash, SvgSave } from '../../icons';

function ListItem({ domain, deleteDomain, editDomain }) {
  const [inputText, setInputText] = useState(domain);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <StyledListItem>
      <Input
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        readOnly={!isEditing}
      />
      <IconGroup>
        {isEditing ? (
          <IconGroup>
            <Icon
              onClick={() => {
                editDomain(domain, inputText);
              }}>
              <SvgSave />
            </Icon>
            <Icon
              onClick={() => {
                setIsEditing(false);
              }}>
              <SvgClose />
            </Icon>
          </IconGroup>
        ) : (
          <Icon
            onClick={() => {
              setIsEditing(true);
            }}>
            <SvgPencil />
          </Icon>
        )}
        <Icon
          onClick={() => {
            deleteDomain(domain);
          }}>
          <SvgTrash />
        </Icon>
      </IconGroup>
    </StyledListItem>
  );
}

ListItem.propTypes = {
  domain: PropTypes.string.isRequired,
  deleteDomain: PropTypes.func.isRequired,
  editDomain: PropTypes.func.isRequired,
};

const StyledListItem = styled.li`
  display: flex;
  align-items: center;
  list-style: none;
  color: #333;
  font-size: 14px;
  padding: 8px 16px;
  border-bottom: 1px solid #f7f7f7;
  &:last-child {
    border: none;
  }
`;

const Input = styled.input`
  flex: 1;
  outline: none;
  border: none;
`;

const IconGroup = styled.div`
  display: flex;
`;

const Icon = styled.div`
  margin: 0px 8px;
  cursor: pointer;
  color: #ababab;
`;

export default ListItem;
