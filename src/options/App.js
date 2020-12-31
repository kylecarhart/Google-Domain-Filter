import React from "react";
import styled from "styled-components";
import ButtonGroup from "./ButtonGroup";
import Setting from "./Setting";
import { useStorage } from "../popup/hooks/";
import {
  FILTER_LIST_ENABLED_KEY,
  FILTER_MODE_DEFAULT_KEY,
  OPTIONS_KEY,
  PREFERENCE_LIST_ENABLED_KEY,
} from "../storage";

function App({ ...props }) {
  const [options, setOptions] = useStorage(OPTIONS_KEY, {});

  return (
    <Container {...props}>
      <h2>Filter Options</h2>
      <hr />
      <Setting
        title="Filter List"
        description="Turns on/off the google domain filter."
      >
        <ButtonGroup
          option={options[FILTER_LIST_ENABLED_KEY]}
          onClick={(bool) => {
            setOptions({ ...options, [FILTER_LIST_ENABLED_KEY]: bool });
          }}
        />
      </Setting>
      <Setting
        title="Preference List"
        description="Turns on/off the preference list highlighting."
      >
        <ButtonGroup
          option={options[PREFERENCE_LIST_ENABLED_KEY]}
          onClick={(bool) => {
            setOptions({ ...options, [PREFERENCE_LIST_ENABLED_KEY]: bool });
          }}
        />
      </Setting>
      <hr />
      <Setting
        title="Filter Mode"
        description="If you are experiencing issues with search result pages not showing any results, try the Experimental option."
      >
        <ButtonGroup
          option={options[FILTER_MODE_DEFAULT_KEY]}
          onText="Default"
          offText="Experimental"
          onClick={(bool) => {
            setOptions({ ...options, [FILTER_MODE_DEFAULT_KEY]: bool });
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
