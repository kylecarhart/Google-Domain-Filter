import { DropdownOption } from "@common/types";
import { cloneElement, useState } from "react";
import { DropdownMenu } from "./DropdownMenu";
import { DropdownMenuItem } from "./DropdownMenuItem";

interface Props {
  trigger: Function;
  items: DropdownOption[];
}

function Dropdown({ trigger, items }: Props) {
  const [referenceElement, setReferenceElement] = useState(null);
  const [isMenuShowing, setIsMenuShowing] = useState(false);

  const renderTrigger = () => {
    const triggerElement = trigger(isMenuShowing);

    return cloneElement(triggerElement, {
      ref: setReferenceElement,
      onClick: () => {
        setIsMenuShowing((isMenuShowing) => !isMenuShowing);
      },
    });
  };

  return (
    <>
      {renderTrigger()}
      {isMenuShowing && (
        <DropdownMenu
          referenceElement={referenceElement}
          onOutsideClick={() => {
            setIsMenuShowing(false);
          }}
        >
          {items.map((item, idx) => (
            <DropdownMenuItem
              key={idx}
              text={item.text}
              onClick={() => {
                item.onClick();
                setIsMenuShowing(false);
              }}
            />
          ))}
        </DropdownMenu>
      )}
    </>
  );
}

export default Dropdown;
