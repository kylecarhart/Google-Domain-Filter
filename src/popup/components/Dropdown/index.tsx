import { useState, cloneElement } from "react";
import { DropdownMenuItem } from "./DropdownMenuItem";
import { DropdownMenu } from "./DropdownMenu";
import { IDropdownOption } from "../DomainListPage/DomainList/DomainListItemDropdown";

interface Props {
  trigger: Function;
  items: IDropdownOption[];
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
