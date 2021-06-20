import { forwardRef } from "react";
import styled from "styled-components";

interface Props {
  text: string;
  setText: (text: string) => void;
  isEditing: boolean;
  startEdit: () => void;
  editDomain: () => void;
}

type Ref = HTMLInputElement;
const DomainListItemInput = forwardRef<Ref, Props>(
  ({ text, setText, isEditing, startEdit, editDomain }, ref) => {
    return (
      <Input
        ref={ref}
        value={text}
        readOnly={!isEditing}
        onChange={(e) => {
          setText(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            editDomain();
          }
        }}
        onDoubleClick={() => {
          startEdit();
        }}
      />
    );
  }
);

const Input = styled.input`
  flex: 1;
  height: 18px;

  &:read-only {
    outline: none;
    background: none;
    border: none;
  }
`;

export default DomainListItemInput;
