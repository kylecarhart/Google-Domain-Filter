import styled from "styled-components";

interface Props {
  text: string;
  onClick: () => void;
}

export function DropdownMenuItem({ onClick, text }: Props) {
  return (
    <StyledDropdownMenuItem onClick={onClick}>{text}</StyledDropdownMenuItem>
  );
}

const StyledDropdownMenuItem = styled.li`
  padding: 10px 55px 10px 13px;
  list-style: none;
  margin: 0;
  cursor: pointer;

  &:hover {
    background: #318bf5;
    color: white;
  }

  &:first-child {
    border-radius: 3px 3px 0px 0px;
  }

  &:last-child {
    border-radius: 0px 0px 3px 3px;
  }
`;
