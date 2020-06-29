import * as React from 'react';

function SvgHelpCircle(props, ref) {
  return (
    <svg
      ref={ref}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="help-circle_svg__feather help-circle_svg__feather-help-circle"
      {...props}>
      <circle cx={12} cy={12} r={10} />
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
    </svg>
  );
}

export default React.forwardRef(SvgHelpCircle);
