import { push } from "@common/extension/popup/features/filterList/filterListSlice";
import { RootState } from "@common/extension/popup/store";
import { Button } from "@ui/components/Button";
import { isValidDomain } from "@utils/domain.util";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

interface Props {}

function DomainInputBar({ ...props }: Props) {
  const filterList = useSelector(
    (state: RootState) => state.filterList.domains
  );
  const dispatch = useDispatch();

  const [inputText, setInputText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddDomain = () => {
    if (!isValidDomain(filterList, inputText)) {
      return;
    }

    dispatch(push(inputText));
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
