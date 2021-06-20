import styled from "styled-components";
import Dropdown from "../../Dropdown";
import { MoreIcon } from "../../../icons";
import { IconButton } from "../../Button";

export interface IDropdownOption {
  text: string;
  onClick: () => void;
}

interface Props {
  domain: string;
  startEdit: () => void;
  showTrigger: boolean;
  deleteDomain: (domain: string) => void;
}

export default function DomainListItemDropdown({
  domain,
  startEdit,
  showTrigger,
  deleteDomain,
}: Props) {
  const editOption: IDropdownOption = {
    text: "Edit",
    onClick: () => {
      startEdit();
    },
  };

  const deleteOption: IDropdownOption = {
    text: "Delete",
    onClick: () => {
      deleteDomain(domain);
    },
  };

  return (
    <Dropdown
      trigger={(isMenuShowing: boolean) => (
        <StyledIconButton isVisible={showTrigger || isMenuShowing}>
          <MoreIcon />
        </StyledIconButton>
      )}
      items={[editOption, deleteOption]}
    />
  );
}

interface IStyledIconButton {
  isVisible: boolean;
}

const StyledIconButton = styled(IconButton)<IStyledIconButton>`
  color: #ababab;
  font-size: 18px;

  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
`;
