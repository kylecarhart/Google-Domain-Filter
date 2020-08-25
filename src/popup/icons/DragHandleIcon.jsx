import * as React from 'react';

function DragHandleIcon(props) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      fill="currentColor"
      {...props}>
      <circle cx={6} cy={3} r={1} />
      <circle cx={6} cy={8} r={1} />
      <circle cx={6} cy={13} r={1} />
      <circle cx={10} cy={3} r={1} />
      <circle cx={10} cy={8} r={1} />
      <circle cx={10} cy={13} r={1} />
    </svg>
  );
}

export default DragHandleIcon;
