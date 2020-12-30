import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Setting({ title, description, children, ...props }) {
  return (
    <StyledSetting {...props}>
      <SettingDescription>
        <SettingTitle>{title}</SettingTitle>
        <SettingSubtitle>{description}</SettingSubtitle>
      </SettingDescription>
      <SettingInput>{children}</SettingInput>
    </StyledSetting>
  );
}

Setting.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.any,
};

const StyledSetting = styled.div`
  display: flex;
  margin-bottom: 1rem;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const SettingDescription = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const SettingTitle = styled.h4`
  margin: 0 0 0.5rem 0;
`;

const SettingSubtitle = styled.p`
  color: #6d6d6d;
  margin-top: 0;
`;

const SettingInput = styled.div`
  display: flex;
  width: 30%;
  justify-content: flex-end;
  align-items: flex-start;

  @media (max-width: 900px) {
    justify-content: flex-start;
  }
`;

export default Setting;
