import React, { useEffect, useRef, useState } from 'react';
import * as SPLAT from 'gsplat';

import './SplatViewer.css';

const scene = new SPLAT.Scene();
const camera = new SPLAT.Camera();
let renderer: SPLAT.WebGLRenderer;
let controls: SPLAT.OrbitControls;

interface SplatViewerProps {
  url: string | null;
}

const SplatViewer = ({ url }: SplatViewerProps) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const rendererRef = useRef<SPLAT.WebGLRenderer | null>(null);
  let viewerWidth = 0;
  let viewerHeight = 0;

  if (!url) return <div className='invalid-url'>Invalid URL</div>

  useEffect(() => {
    if (!viewerRef.current) return;
    renderViewer(url);

    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      scene.reset();
    };
  }, [url]);

  async function renderViewer(url: string) {
    await SPLAT.Loader.LoadAsync(url, scene, (progress) =>
      setProgress(progress),
    );

    renderer = new SPLAT.WebGLRenderer(canvasRef.current);
    controls = new SPLAT.OrbitControls(camera, renderer.canvas);
    rendererRef.current = renderer;

    const frame = () => {
      handleResize();
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  }

  function handleResize() {
    if (!viewerRef.current) return;
    const width = viewerRef.current.clientWidth;
    const height = viewerRef.current.clientHeight;

    if (width === viewerWidth && height === viewerHeight) {
      return;
    }

    viewerWidth = width;
    viewerHeight = height;
    renderer.setSize(viewerWidth, viewerHeight);
    renderer.resize();
    camera.update();
  }

  function handleProgress(progress: number) {
    let isLoading = progress < 1;
    if (!isLoading) return null;
    return (
      <div className="splat-loader">
        {`Loading: ${(progress * 100).toFixed(2)}%`}
      </div>
    );
  }

  return (
    <div className="splat-viewer" ref={viewerRef}>
      {handleProgress(progress)}
      <canvas
        id="canvas"
        ref={canvasRef}
        width={viewerWidth}
        height={viewerHeight}
      />
    </div>
  );
};

export default SplatViewer;
