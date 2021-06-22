import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button } from "../../Button";

interface Props {
  domains: string[];
  addDomain: (domain: string) => boolean;
}

export default function DomainInput({ domains, addDomain, ...props }: Props) {
  const [inputText, setInputText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddDomain = () => {
    if (addDomain(inputText)) {
      setInputText("");
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <StyledDomainInput {...props}>
      <Input
        ref={inputRef}
        placeholder="Enter domain"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddDomain();
          }
        }}
      />
      <StyledButton
        styleType="primary"
        onClick={() => {
          handleAddDomain();
        }}
      >
        Add
      </StyledButton>
    </StyledDomainInput>
  );
}

const StyledButton = styled(Button)`
  margin-left: 0;
  border-radius: 0 3px 3px 0;
`;

const StyledDomainInput = styled.div`
  display: flex;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  color: #333;
  outline: none;
  border: none;
  border-radius: 3px 0 0 3px;
  background-color: white;
  font-size: 14px;
  padding: 6px 16px;
  width: 0;
  flex: 1 1 auto;

  &::placeholder {
    color: #b8b8b8;
  }
`;
