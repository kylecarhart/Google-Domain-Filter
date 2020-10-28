import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../button';
import { Dropdown } from '../dropdown';
import DomainContext from '../../context/DomainContext';

function InputSettingsDropdown() {
  const [domainList, setDomainList] = useContext(DomainContext);

  const sortDomains = () => {
    setDomainList((list) => {
      return [...list].sort(function (a, b) {
        if (a.toUpperCase() < b.toUpperCase()) {
          return -1;
        } else if (a.toUpperCase() > b.toUpperCase()) {
          return 1;
        } else {
          return 0;
        }
      });
    });
  };

  return (
    <Dropdown
      trigger={() => <Button>Settings</Button>}
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
