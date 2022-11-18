import { Placement } from "@popperjs/core";
import { ReactNode, useState } from "react";
import { usePopper } from "react-popper";
import styled from "styled-components";
import { useOutsideClick } from "../../../../../../libs/common/ui/hooks";

interface Props {
  referenceElement: HTMLElement;
  placement?: Placement;
  onOutsideClick: (e: MouseEvent) => void;
  children: ReactNode;
}

export function DropdownMenu({
  referenceElement,
  placement = "bottom-end",
  onOutsideClick,
  children,
}: Props) {
  const [popperElement, setPopperElement] = useState(null);

  useOutsideClick(popperElement, (e) => {
    if (!referenceElement.contains(e.target as HTMLElement)) {
      onOutsideClick(e);
    }
  });

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
      {
        name: "hide",
      },
    ],
  });

  return (
    <StyledDropdownMenu
      ref={setPopperElement}
      style={styles.popper}
      {...attributes.popper}
    >
      {children}
    </StyledDropdownMenu>
  );
}

const StyledDropdownMenu = styled.ul`
  background: #fff;
  color: #000;
  border-radius: 3px;
  padding: 0;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 20px rgba(0, 0, 0, 0.1);
  margin: 0;
  font-size: 14px;

  &[data-popper-reference-hidden="true"] {
    visibility: hidden;
    pointer-events: none;
  }
`;
