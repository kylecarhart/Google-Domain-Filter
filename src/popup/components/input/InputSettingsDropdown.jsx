import React from "react";
import PropTypes from "prop-types";
import { Button } from "../button";
import { Dropdown } from "../dropdown";

function InputSettingsDropdown() {
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
