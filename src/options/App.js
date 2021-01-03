import React from "react";
import styled from "styled-components";
import ButtonGroup from "./ButtonGroup";
import Setting from "./Setting";
import storage from "../storage";

function App({ ...props }) {
  const [options, setOptions] = storage.options.useHook();

  return (
    <Container {...props}>
      <h3>Filter Options</h3>
      <hr />
      <Setting title="Filter List" description="Turns on/off domain filtering.">
        <ButtonGroup
          option={options.filterListEnabled}
          onClick={(bool) => {
            setOptions({
              ...options,
              filterListEnabled: bool,
            });
          }}
        />
      </Setting>
      <Setting
        title="Preference List"
        description="Turns on/off preference list highlighting."
      >
        <ButtonGroup
          option={options.preferenceListEnabled}
          onClick={(bool) => {
            setOptions({
              ...options,
              preferenceListEnabled: bool,
            });
          }}
        />
      </Setting>
      <hr />
      <Setting
        title="Filter Mode"
        description="If you are experiencing issues with search result pages not showing any results, try the Experimental option."
      >
        <ButtonGroup
          option={options.filterMode}
          onText="Default"
          offText="Experimental"
          onClick={(bool) => {
            setOptions({
              ...options,
              filterMode: bool,
            });
          }}
        />
      </Setting>
      <hr />
    </Container>
  );
}

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto 0 auto;

  @media (max-width: 900px) {
    padding: 1rem;
  }
`;

export default App;
