import React, { useState } from 'react';
import styled from 'styled-components';
import Dropdown from './components/dropdown/Dropdown';
import DropdownItem from './components/dropdown/DropdownItem';

export default function App() {
  return (
    <div>
      <Dropdown>
        <DropdownItem>Sort</DropdownItem>
        <DropdownItem>Disable Filter</DropdownItem>
        <DropdownItem>Switch to Whitelist</DropdownItem>
      </Dropdown>
    </div>
  );
}

const StyledApp = styled.div`
  background: #f6f6f6;
`;
