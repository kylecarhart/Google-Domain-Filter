import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../button';
import { Dropdown } from '../dropdown';

function InputSettingsDropdown({ sortDomains }) {
  return (
    <Dropdown
      trigger={() => (
        <Button
          onClick={() => {
            console.log('clicked');
          }}>
          Settings
        </Button>
      )}
      items={[
        {
          text: 'Sort',
          onClick: () => {
            sortDomains();
          },
        },
        {
          text: 'Disable Filter',
          onClick: () => {},
        },
        {
          text: 'Switch to Whitelist',
          onClick: () => {},
        },
      ]}
    />
  );
}

InputSettingsDropdown.propTypes = {
  sortDomains: PropTypes.func.isRequired,
};

export default InputSettingsDropdown;
