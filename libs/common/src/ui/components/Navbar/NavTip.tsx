import Tippy from "@tippyjs/react";
import styled from "styled-components";
import { HelpCircleIcon } from "../../icons";

interface Props {
  text: string;
}

function NavTip({ text }: Props) {
  return (
    <StyledTippy
      content={text}
      delay={[300, 0]}
      arrow={true}
      placement="bottom"
    >
      <div>
        <Icon />
      </div>
    </StyledTippy>
  );
}

const StyledTippy = styled(Tippy)`
  position: relative;
  background-color: rgba(0, 0, 0, 0.75);
  color: #fff;
  border-radius: 3px;
  font-size: 14px;
  line-height: 1.4;
  width: 190px;
  padding: 6px 14px;

  .tippy-arrow {
    top: 0;
    width: 16px;
    height: 16px;
    color: rgba(0, 0, 0, 0.75);

    &:before {
      content: "";
      position: absolute;
      border-color: transparent;
      border-style: solid;
      top: -7px;
      left: 0;
      border-width: 0 8px 8px;
      border-bottom-color: initial;
      transform-origin: center bottom;
    }
  }
`;

const Icon = styled(HelpCircleIcon)`
  margin-left: 0.5rem;
  &:focus {
    outline: none;
  }
  display: block;
`;

export default NavTip;
