import React from 'react';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react';
import styled from 'styled-components';
import { SvgHelpCircle } from '../../icons';

function NavTip({ text }) {
  return (
    <StyledTippy
      content={text}
      delay={300}
      render={(attrs) => (
        <TipBox className="box" tabIndex="-1" {...attrs}>
          My tippy box
          <Arrow data-popper-arrow="" />
        </TipBox>
      )}>
      <Icon />
    </StyledTippy>
  );
}

NavTip.propTypes = {
  text: PropTypes.string.isRequired,
};

const StyledTippy = styled(Tippy)`
  background: rgba(0, 0, 0, 0.75);
  border-radius: 3px;
  padding: 8px 16px;
  width: 200px;

  /* Styling the arrow for different placements */
  &[data-placement^='top'] > .tippy-arrow::before {
    border-top-color: purple;
  }
`;

const Icon = styled(SvgHelpCircle)`
  &:focus {
    outline: none;
  }
`;

const Arrow = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  z-index: -1;

  &::before {
    position: absolute;
    width: 8px;
    height: 8px;
    z-index: -1;
    content: '';
    transform: rotate(45deg);
    background: #333;
    bottom: 22px;
  }
`;

const TipBox = styled.div`
  background: #333;
  color: white;
  font-weight: bold;
  padding: 4px 8px;
  font-size: 13px;
  border-radius: 4px;
`;

export default NavTip;
