import { blobToDataURL, dataURLToBlobURL } from '../../tools/blob';
import { getImageSize } from '../../tools/image';
import { hash } from '../../tools/index';
import { lfGetItem, lfSetItem } from '../storage/index';

export type ImageHash = string;

export interface ImageObject {
  hash: ImageHash;
  blobURL: string;
  width: number;
  height: number;
}

let images = {};

export async function storeImage(file: File): Promise<ImageHash> {
  if (!file || !(file instanceof File)) {
    throw new Error('Please provide a valid image file.');
  }

  try {
    // Convert the file into a Blob for storage
    const fileBlob = new Blob([file], { type: file.type });

    // Store the image blob in IndexedDB with a unique key (like the file name)
    const dataURL = await blobToDataURL(fileBlob, file.type);
    const imageHash = `_${hash(dataURL)}`;
    await lfSetItem(1, imageHash, dataURL);
    return imageHash;
  } catch (error) {
    return '';
  }
}

export async function getImage(imageHash: ImageHash): Promise<ImageObject> {
  let object: ImageObject = {
    hash: imageHash,
    blobURL: '',
    width: 0,
    height: 0
  };
  const item = await lfGetItem(1, imageHash);
  if (!images.hasOwnProperty(imageHash)) {
    const imageSize = await getImageSize(item);
    const blobURL = await dataURLToBlobURL(item);
    object.blobURL = blobURL;
    object.width = imageSize.width;
    object.height = imageSize.height;
    images[imageHash] = object;
  } else {
    object = images[imageHash];
  }
  return object;
}
