import styled, { css } from "styled-components";

interface Props {
  onText?: string;
  offText?: string;
  onValue?: string | boolean;
  offValue?: string | boolean;
  option: string | boolean;
  onClick: (val: string | boolean) => void;
  disabled?: boolean;
}

function ButtonGroup({
  onText = "On",
  offText = "Off",
  onValue = true,
  offValue = false,
  option,
  onClick,
  disabled = false,
  ...props
}: Props) {
  return (
    <div {...props}>
      <StyledButton
        disabled={disabled}
        selected={option === onValue}
        onClick={() => {
          onClick(onValue);
        }}
      >
        {onText}
      </StyledButton>
      <StyledButton
        disabled={disabled}
        selected={option === offValue}
        onClick={() => {
          onClick(offValue);
        }}
      >
        {offText}
      </StyledButton>
    </div>
  );
}

interface StyledButtonProps {
  disabled: boolean;
  selected: boolean;
}

const primaryStyle = css<StyledButtonProps>`
  color: #fff;
  background: #318bf5;

  &:hover {
    background: ${({ disabled }) => (disabled ? "#318bf5" : "#0f75ec")};
  }
`;

const defaultStyle = css<StyledButtonProps>`
  color: #333;
  background: #fff;

  &:hover {
    background: ${({ disabled }) => (disabled ? "#fff" : "#f0f0f0")};
  }
`;

const StyledButton = styled.button<StyledButtonProps>`
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  border: none;
  padding: 6px 16px;
  border-radius: 2px;
  font-size: 14px;
  box-shadow:
    0px 1px 15px rgba(0, 0, 0, 0.05),
    0px 1px 2px rgba(0, 0, 0, 0.1);

  ${({ selected }) => (selected ? primaryStyle : defaultStyle)}
`;

export default ButtonGroup;
