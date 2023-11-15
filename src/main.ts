import * as SPLAT from "gsplat";
import viewportInfo from './utils/viewportInfo'
import './style.css'

const scene = new SPLAT.Scene();
const camera = new SPLAT.Camera();
const renderer = new SPLAT.WebGLRenderer();
const controls = new SPLAT.OrbitControls(camera, renderer.domElement);

controls.minAngle = 10;
controls.maxAngle = 60;
controls.minZoom = 2;
controls.maxZoom = 6;

const onProgress = (progress: number) => {
  console.log(progress)
}

async function main() {
  const name = 'garden';
  const url = `https://huggingface.co/datasets/dylanebert/3dgs/resolve/main/${name}/${name}-7k.splat`;
  await SPLAT.Loader.LoadAsync(url, scene, onProgress);

  const frame = () => {
    controls.update();
    renderer.setSize(viewportInfo.vw(100), viewportInfo.vh(100))
    renderer.render(scene, camera);

    requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);
}

main();