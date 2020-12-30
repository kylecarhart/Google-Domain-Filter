import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

function ButtonGroup({
  onText = "On",
  offText = "Off",
  option,
  onClick,
  ...props
}) {
  return (
    <div {...props}>
      <Button
        selected={option}
        onClick={() => {
          onClick(true);
        }}
      >
        {onText}
      </Button>
      <Button
        selected={!option}
        onClick={() => {
          onClick(false);
        }}
      >
        {offText}
      </Button>
    </div>
  );
}

ButtonGroup.propTypes = {
  onText: PropTypes.string,
  offText: PropTypes.string,
  option: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const primaryStyle = css`
  color: #fff;
  background: #318bf5;

  &:hover {
    background: #0f75ec;
  }
`;

const defaultStyle = css`
  color: #333;
  background: #fff;

  &:hover {
    background: #f0f0f0;
  }
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  padding: 6px 16px;
  border-radius: 2px;
  font-size: 14px;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.1);

  ${({ selected }) => (selected ? primaryStyle : defaultStyle)}
`;

export default ButtonGroup;
