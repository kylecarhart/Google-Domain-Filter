import { ComponentPropsWithRef, forwardRef, ReactNode } from "react";
import styled from "styled-components";

interface Props extends ComponentPropsWithRef<"button"> {
  children: ReactNode;
}

type Ref = HTMLButtonElement;
export const IconButton = forwardRef<Ref, Props>(
  ({ children, ...props }, ref) => (
    <Button ref={ref} {...props}>
      {children}
    </Button>
  )
);

const Button = styled.button`
  margin: 0;
  padding: 0 0.5em;
  border: 0;
  cursor: pointer;
  background: none;
  line-height: 0;
`;
