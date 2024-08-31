import React, { useState } from 'react';

import './App.css';
import SplatViewer from './components/SplatViewer';
import { Card } from './components/Card';
import Controls from './components/Controls';

function App() {
  const splats = [
    'postshot/bikes/bikes_3.splat',
    'postshot/ford-gt/ford-gt.splat',
    'postshot/flowers1/flowers1.splat',
  ];
  const [currentSplat, setCurrentSplat] = useState(0);
  const nextSplat = () => setCurrentSplat((currentSplat + 1) % splats.length);
  const prevSplat = () =>
    setCurrentSplat((currentSplat - 1 + splats.length) % splats.length);

  const filename = splats[currentSplat].split('/').pop();
  const displayName = filename?.split('.').shift();
  const url = `https://huggingface.co/datasets/roman-apollo/3dgs/resolve/main/${splats[currentSplat]}`;

  return (
    <div className="wrapper">
      <Card>
        <h1>{displayName}</h1>
        <SplatViewer url={url} />
        <Controls name={filename} prevSplat={prevSplat} nextSplat={nextSplat} />
      </Card>
    </div>
  );
}

export default App;