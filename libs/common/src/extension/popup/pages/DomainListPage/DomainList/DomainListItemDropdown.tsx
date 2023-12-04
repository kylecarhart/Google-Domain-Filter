import styled from "styled-components";
import { MoreIcon } from "../../../../../ui/icons";
import { IconButton } from "../../../../../ui/components/Button";
import { Dropdown } from "../../../../../ui/components/Dropdown";

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
  const editOption = {
    text: "Edit",
    onClick: () => {
      startEdit();
    },
  };

  const deleteOption = {
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

interface StyledIconButtonProps {
  isVisible: boolean;
}

const StyledIconButton = styled(IconButton)<StyledIconButtonProps>`
  color: #ababab;
  font-size: 18px;

  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
`;
