import React from "react";
import styled from "styled-components";
import ButtonGroup from "./ButtonGroup";
import Setting from "./Setting";

function App({ ...props }) {
  return (
    <Container {...props}>
      <h2>Settings</h2>
      <hr />
      <Setting
        title="Filter List"
        description="Turns on/off the google domain filter."
      >
        <ButtonGroup />
      </Setting>
      <Setting
        title="Preference List"
        description="Turns on/off the preference list highlighting."
      >
        <ButtonGroup />
      </Setting>
      <hr />
      <Setting
        title="Filter Mode"
        description="If you are experiencing issues with search result pages not showing any results, try the Experimental option."
      >
        <ButtonGroup />
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
