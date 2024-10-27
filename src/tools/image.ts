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
