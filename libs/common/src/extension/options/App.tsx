import { setOptions } from "../../redux/features/options/optionsSlice";
import { RootState } from "../../redux/store";
import { FilterMode } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ButtonGroup from "./ButtonGroup";
import React from "react";

declare const __VERSION__: string;

function App() {
  const options = useSelector((state: RootState) => state.options);
  const dispatch = useDispatch();

  const version = __VERSION__;

  return (
    <Container>
      <h3>Filter Options</h3>
      <hr />
      {/* Filter List ON/OFF */}
      <Setting>
        <Description>
          <Title>Filter List</Title>
          <Subtitle>Turns on/off domain filtering.</Subtitle>
        </Description>
        <SettingInput>
          <ButtonGroup
            option={options.filterListEnabled}
            onClick={(val) => {
              dispatch(setOptions({ filterListEnabled: Boolean(val) }));
            }}
          />
        </SettingInput>
      </Setting>
      {/* Preference List ON/OFF */}
      <Setting>
        <Description>
          <Title>Preference List</Title>
          <Subtitle>Turns on/off preference list highlighting.</Subtitle>
        </Description>
        <SettingInput>
          <ButtonGroup
            option={options.preferenceListEnabled}
            onClick={(val) => {
              dispatch(
                setOptions({
                  preferenceListEnabled: Boolean(val),
                })
              );
            }}
          />
        </SettingInput>
      </Setting>
      <hr />
      {/* Filter Mode: Defualt/Experimental */}
      <Setting disabled={!options.filterListEnabled}>
        <Description>
          <Title>Filter Mode</Title>
          <Subtitle>
            Change the method in which domains are filtered from Google search
            results.
          </Subtitle>
          <SmallSubtitle>
            The <b>Default</b> filter mode may result in fewer search results
            per page.
          </SmallSubtitle>
          <SmallSubtitle>
            The <b>Experimental</b> filter mode is more accurate at filtering,
            but may have some weird quirks/side effects (ex: Google Translate
            not working).
          </SmallSubtitle>
          <SmallSubtitle style={{ margin: "1rem 0" }}>
            <i>
              If you are experiencing issues with search result pages not
              showing any results, try the Experimental option.
            </i>
          </SmallSubtitle>
        </Description>
        <SettingInput>
          <ButtonGroup
            disabled={!options.filterListEnabled}
            option={options.filterMode}
            onText="Default"
            onValue={"default" as FilterMode}
            offText="Experimental"
            offValue={"experimental" as FilterMode}
            onClick={(val: FilterMode) => {
              dispatch(
                setOptions({
                  filterMode: val,
                })
              );
            }}
          />
        </SettingInput>
      </Setting>
      <hr />
      <SmallSubtitle>Version: {version}</SmallSubtitle>
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

interface SettingInterface {
  disabled?: boolean;
}

const Setting = styled.div<SettingInterface>`
  display: flex;
  margin-bottom: 1rem;

  @media (max-width: 900px) {
    flex-direction: column;
  }
  opacity: ${({ disabled }) => (disabled ? ".5" : "1")};
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Title = styled.h5`
  margin: 0 0 0.5rem 0;
`;

const Subtitle = styled.p`
  color: #6d6d6d;
  margin-top: 0;
`;

const SmallSubtitle = styled.small`
  color: #6d6d6d;

  & > b {
    color: #333;
  }
`;

const SettingInput = styled.div`
  display: flex;
  width: 30%;
  justify-content: flex-end;
  align-items: flex-start;

  @media (max-width: 900px) {
    justify-content: flex-start;
    width: 100%;
  }
`;

export default App;
