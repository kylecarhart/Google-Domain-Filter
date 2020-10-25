import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { usePopper } from 'react-popper';
import { useOutsideClick } from '../../hooks';

function DropdownMenu({ referenceElement, placement = 'bottom-end', onOutsideClick, children }) {
  const [popperElement, setPopperElement] = useState(null);

  useOutsideClick(popperElement, (e) => {
    if (e.target != referenceElement) {
      onOutsideClick(e);
    }
  });

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
      {
        name: 'hide',
      },
    ],
  });

  return (
    <StyledDropdownMenu ref={setPopperElement} style={styles.popper} {...attributes.popper}>
      {children}
    </StyledDropdownMenu>
  );
}

DropdownMenu.propTypes = {
  referenceElement: PropTypes.any,
  placement: PropTypes.string,
  onOutsideClick: PropTypes.func.isRequired,
  children: PropTypes.any,
};

const StyledDropdownMenu = styled.ul`
  background: #fff;
  color: #000;
  border-radius: 3px;
  padding: 0;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 20px rgba(0, 0, 0, 0.1);
  margin: 0;
  font-size: 14px;

  &[data-popper-reference-hidden='true'] {
    visibility: hidden;
    pointer-events: none;
  }
`;

export default DropdownMenu;
