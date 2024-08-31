import * as SPLAT from 'gsplat';

export interface SplatDropInputProps {
  scene: SPLAT.Scene;
  onProgress: (progress: number) => void;
}

export const splatDropInput = ({ scene, onProgress }: SplatDropInputProps) => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.splat';

  let loading = false;

  const selectFile = async (file: File) => {
    if (loading) return;
    loading = true;
    if (file.name.endsWith('.splat')) {
      await SPLAT.Loader.LoadFromFileAsync(file, scene);
    } else if (file.name.endsWith('.ply')) {
      await SPLAT.PLYLoader.LoadFromFileAsync(file, scene, onProgress);
    }
    //scene.saveToFile(file.name.replace(".ply", ".splat"));
    loading = false;
  };

  document.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer != null && e.dataTransfer.files.length > 0) {
      selectFile(e.dataTransfer.files[0]);
    }
  });
};
