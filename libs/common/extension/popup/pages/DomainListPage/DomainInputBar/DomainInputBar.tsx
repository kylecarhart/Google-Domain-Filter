import { push as pushFilter } from "@common/redux/features/domainList/domainListSlice";
import { Button } from "@ui/components/Button";
import { isValidDomain } from "@utils/domain.util";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { DomainListContext } from "../ListPage";

interface Props {}

function DomainInputBar({ ...props }: Props) {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputText, setInputText] = useState("");
  const { list, listType } = useContext(DomainListContext);

  const handleAddDomain = () => {
    if (!isValidDomain(list, inputText)) {
      return;
    }

    dispatch(
      pushFilter({
        domain: inputText,
        type: listType,
      })
    );

    setInputText("");
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <StyledDomainInputBar {...props}>
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
    </StyledDomainInputBar>
  );
}

const StyledDomainInputBar = styled.div`
  display: flex;
`;

const StyledButton = styled(Button)`
  margin-left: 0;
  border-radius: 0 3px 3px 0;
`;

const StyledDomainInput = styled.div`
  display: flex;
  flex: 1;
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

export default DomainInputBar;
