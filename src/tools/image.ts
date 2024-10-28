import { Color } from './colors';

import ColorThief from './node_modules/colorthief/dist/color-thief.mjs';

export interface ImageSize {
  width: number;
  height: number;
}

export async function getImageSize(dataURL: string): Promise<ImageSize> {
  return await new Promise((resolve, reject) => {
    try {
      const img = new Image();
      img.onload = function () {
        resolve({ width: parseInt(img.width), height: parseInt(img.height) });
      };
      img.src = dataURL;
    } catch (error) {
      reject(error);
    }
  });
}

export async function getImageColors(dataURL: string): Promise<Array<Color>> {
  return await new Promise((resolve, reject) => {
    try {
      const img = new Image();
      img.onload = function () {
        ColorThief.getColor(img).then((colors) => {
          let result = [];
          for (const color of colors) {
            result.push({ r: color[0], g: color[1], b: color[2] });
          }
          resolve(result);
        });
      };
      img.src = dataURL;
    } catch (error) {
      reject(error);
    }
  });
}
