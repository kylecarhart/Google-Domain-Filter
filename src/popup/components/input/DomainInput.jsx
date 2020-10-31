import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '../button';
import DomainContext from '../../context/DomainContext';
import validator from 'validator';
import { sortLexIgnoreCase } from '../../../utils';

function DomainInput({ ...props }) {
  const [inputText, setInputText] = useState('');
  const [domainList, setDomainList, isPreferenceList] = useContext(DomainContext);

  const addDomain = () => {
    if (validator.isFQDN(inputText) && !domainList.includes(inputText)) {
      if (!isPreferenceList) {
        setDomainList((domainList) => sortLexIgnoreCase([...domainList, inputText]));
      } else {
        setDomainList((domainList) => [inputText, ...domainList]);
      }
      setInputText('');
    }
  };

  return (
    <StyledDomainInput {...props}>
      <Input
        placeholder="Enter domain"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addDomain();
          }
        }}
      />
      <Button
        type="primary"
        onClick={() => {
          addDomain();
        }}>
        Add
      </Button>
    </StyledDomainInput>
  );
}

DomainInput.propTypes = {};

const StyledDomainInput = styled.div`
  display: flex;
`;

const Input = styled.input`
  color: #333;
  outline: none;
  border: none;
  border-radius: 3px;
  background-color: white;
  font-size: 14px;
  padding: 6px 16px;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.1);
  width: 0;
  flex: 1 1 auto;

  &::placeholder {
    color: #b8b8b8;
  }
`;

export default DomainInput;
