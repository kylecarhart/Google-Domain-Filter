import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/* 
  @param: style: ok, warn, error
  @param: iconPosition: left, right
  //TODO: finish icon support
*/
export default function Tip({ text, icon, iconPosition = 'right' }) {
  return (
    <StyledTip theme={TipWarnTheme}>
      <span style={{ order: iconPosition === 'right' ? 0 : 1 }}>{text}</span>
      {icon}
    </StyledTip>
  );
}

Tip.propTypes = {
  text: PropTypes.string,
  style: PropTypes.oneOf(['ok', 'warn', 'error']),
  icon: PropTypes.object,
  iconPosition: PropTypes.oneOf(['left', 'right']),
};

const StyledTip = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 8px 16px;
  justify-content: space-between;
  background: ${(props) => props.theme.background || '#ffffff'};
  border-radius: ${(props) => props.theme.borderRadius || '0px'};
  color: ${(props) => props.theme.color || '#333333'};
`;

const TipWarnTheme = {
  background: `#f0e3b7`,
  borderRadius: '5px',
  color: '#5c4906',
};
