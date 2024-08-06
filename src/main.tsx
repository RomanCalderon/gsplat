import * as SPLAT from "gsplat";
import viewportInfo from './utils/viewportInfo'
import './style.css'
import React from "react";
import { splatDropInput } from "./utils/SplatDropInput";

const scene = new SPLAT.Scene();
const camera = new SPLAT.Camera();
const renderer = new SPLAT.WebGLRenderer();
const controls = new SPLAT.OrbitControls(camera, renderer.domElement);

controls.minAngle = -90;
controls.maxAngle = 90;
controls.minZoom = 0.1;
controls.maxZoom = 50;
controls.dampening = 0.6;

const onProgress = (progress: number) => {
  console.log(progress)

  return (<strong>PROGRESS: {progress}</strong>)
}

async function main() {
  
  // const dataPath = 'postshot/bikes/bikes_3.splat';
  // const dataPath = 'postshot/electric-guitar/electric-guitar.splat';
  const dataPath = 'postshot/flowers1/flowers1.splat';
  // const dataPath = 'postshot/ford-gt/ford-gt.splat';
  // const dataPath = 'postshot/guitar-1/guitar-1.splat'; // causes runtime error: memory access out of bounds
  // const dataPath = 'postshot/jimny/jimny.splat';
  // const dataPath = 'postshot/m235/m235.splat';
  // const dataPath = 'postshot/marcus/marcus.splat';

  const url = `https://huggingface.co/datasets/roman-apollo/3dgs/resolve/main/${dataPath}`;
  await SPLAT.Loader.LoadAsync(url, scene, (progress) => console.log(progress));

  splatDropInput({ scene, onProgress });
  
  const frame = () => {
    controls.update();
    renderer.setSize(viewportInfo.vw(100), viewportInfo.vh(100))
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);
}

main();