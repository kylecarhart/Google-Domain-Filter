import { Button } from "../../Button";
import Dropdown from "../../Dropdown";

function InputSettingsDropdown() {
  return (
    <Dropdown
      trigger={() => <Button styleType="default">Settings</Button>}
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
