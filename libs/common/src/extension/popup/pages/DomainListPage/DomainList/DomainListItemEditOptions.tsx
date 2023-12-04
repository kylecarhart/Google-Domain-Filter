import styled from "styled-components";
import { CloseIcon, SaveIcon } from "../../../../../ui/icons";
import { IconButton } from "../../../../../ui/components/Button";

interface Props {
  editDomain: () => void;
  cancelEdit: () => void;
}

function DomainListItemEditOptions({ editDomain, cancelEdit }: Props) {
  return (
    <>
      <StyledIconButton
        onClick={() => {
          editDomain();
        }}
      >
        <SaveIcon />
      </StyledIconButton>
      <StyledIconButton
        onClick={() => {
          cancelEdit();
        }}
      >
        <CloseIcon />
      </StyledIconButton>
    </>
  );
}

const StyledIconButton = styled(IconButton)`
  color: #ababab;
`;

export default DomainListItemEditOptions;
