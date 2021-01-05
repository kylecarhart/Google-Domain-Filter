import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

function ButtonGroup({
  onText = "On",
  offText = "Off",
  onValue = true,
  offValue = false,
  option,
  onClick,
  disabled = false,
  ...props
}) {
  return (
    <div {...props}>
      <Button
        disabled={disabled}
        selected={option === onValue}
        onClick={() => {
          onClick(onValue);
        }}
      >
        {onText}
      </Button>
      <Button
        disabled={disabled}
        selected={option === offValue}
        onClick={() => {
          onClick(offValue);
        }}
      >
        {offText}
      </Button>
    </div>
  );
}

ButtonGroup.propTypes = {
  onText: PropTypes.string,
  onValue: PropTypes.any,
  offText: PropTypes.string,
  offValue: PropTypes.any,
  option: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

const primaryStyle = css`
  color: #fff;
  background: #318bf5;

  &:hover {
    background: ${({ disabled }) => (disabled ? "#318bf5" : "#0f75ec")};
  }
`;

const defaultStyle = css`
  color: #333;
  background: #fff;

  &:hover {
    background: ${({ disabled }) => (disabled ? "#fff" : "#f0f0f0")};
  }
`;

const Button = styled.button`
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  border: none;
  padding: 6px 16px;
  border-radius: 2px;
  font-size: 14px;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.1);

  ${({ selected }) => (selected ? primaryStyle : defaultStyle)}
`;

export default ButtonGroup;
