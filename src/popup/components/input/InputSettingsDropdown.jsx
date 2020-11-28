import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Button } from "../button";
import { Dropdown } from "../dropdown";
import DomainContext from "../../context/DomainContext";

function InputSettingsDropdown() {
  const [domainList, setDomainList] = useContext(DomainContext);

  return (
    <Dropdown
      trigger={() => <Button>Settings</Button>}
      items={[
        {
          text: "Disable Filter",
          onClick: () => {},
        },
        // {
        //   text: 'Switch to Whitelist',
        //   onClick: () => {},
        // },
      ]}
    />
  );
}

InputSettingsDropdown.propTypes = {};

export default InputSettingsDropdown;
