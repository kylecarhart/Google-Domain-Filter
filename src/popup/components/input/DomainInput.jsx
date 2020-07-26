import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '../button';

function DomainInput({ addDomain }) {
  const [inputText, setInputText] = useState('');

  return (
    <div>
      <Input
        placeholder="Enter domain"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          addDomain(inputText);
        }}>
        Add
      </Button>
    </div>
  );
}

DomainInput.propTypes = {
  addDomain: PropTypes.func.isRequired,
};

const Input = styled.input`
  color: #333;
  outline: none;
  border: none;
  border-radius: 2px;
  background-color: white;
  font-size: 14px;
  padding: 6px 16px;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.1);

  &::placeholder {
    color: #b8b8b8;
  }
`;

export default DomainInput;
