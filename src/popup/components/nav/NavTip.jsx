import React from 'react';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react';
import styled from 'styled-components';
import { HelpCircleIcon } from '../../icons';

function NavTip({ text }) {
  return (
    <StyledTippy
      content={text}
      delay={[300, 0]}
      arrow={true}
      placement="bottom">
      <Icon />
    </StyledTippy>
  );
}

NavTip.propTypes = {
  text: PropTypes.string.isRequired,
};

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
      content: '';
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
  &:focus {
    outline: none;
  }
`;

export default NavTip;
