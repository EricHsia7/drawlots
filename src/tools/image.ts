import { Color } from './colors';

const ColorThief = require('colorthief/dist/color-thief.umd.js');

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

export async function getImageColor(dataURL: string): Promise<Color> {
  return await new Promise((resolve, reject) => {
    try {
      const img = new Image();
      img.onload = function () {
        const colorThief = new ColorThief();
        const colors = colorThief.getPalette(img, 5);
        const colorsQuantity = colors.length;
        let totalRed = 0;
        let totalGreen = 0;
        let totalBlue = 0;
        for (const color of colors) {
          totalRed += color[0];
          totalGreen += color[1];
          totalBlue += color[2];
        }
        const r = Math.floor(totalRed / colorsQuantity);
        const g = Math.floor(totalGreen / colorsQuantity);
        const b = Math.floor(totalBlue / colorsQuantity);
        resolve({ r, g, b });
      };
      img.src = dataURL;
    } catch (error) {
      reject(error);
    }
  });
}
