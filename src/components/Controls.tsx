import React from 'react';

import './Controls.css';

interface ControlsProps {
  name: string | undefined;
  prevSplat: () => void | undefined;
  nextSplat: () => void | undefined;
}

const Controls = ({ name, prevSplat, nextSplat }: ControlsProps) => {
  return (
    <div className="controls">
      {prevSplat && <button onClick={prevSplat}>Prev</button>}
      {name && <span>{name}</span>}
      {nextSplat && <button onClick={nextSplat}>Next</button>}
    </div>
  );
};

export default Controls;
