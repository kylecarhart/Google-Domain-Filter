import React from "react";
import styled from "styled-components";

function DomainListItemInput(
  { textState, isEditingState, editDomain, ...props },
  ref
) {
  const [text, setText] = textState;
  const [isEditing, setIsEditing] = isEditingState;

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
        setIsEditing();
        ref.current.setSelectionRange(-1, -1); // set cursor to end
      }}
    />
  );
}

const Input = styled.input`
  flex: 1;
  height: 18px;

  &:read-only {
    outline: none;
    background: none;
    border: none;
  }
`;

export default React.forwardRef(DomainListItemInput);
