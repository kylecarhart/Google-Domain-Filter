import { ComponentPropsWithRef, forwardRef, ReactNode } from "react";
import styled, { css } from "styled-components";

interface Props extends ComponentPropsWithRef<"button"> {
  styleType: "primary" | "default";
  children: ReactNode;
}

type Ref = HTMLButtonElement;
export const Button = forwardRef<Ref, Props>(
  ({ styleType, children, ...props }, ref) => (
    <StyledButton ref={ref} styleType={styleType} {...props}>
      {children}
    </StyledButton>
  )
);

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

interface StyledButtonProps {
  styleType: string;
}
const StyledButton = styled.button<StyledButtonProps>`
  cursor: pointer;
  border: none;
  padding: 6px 16px;
  border-radius: 2px;
  font-size: 14px;
  margin-left: 8px;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.1);

  ${({ styleType }) => (styleType === "primary" ? primaryStyle : defaultStyle)}
`;
