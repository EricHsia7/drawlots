import { blobToDataURL, dataURLToBlobURL } from '../../tools/blob';
import { hash } from '../../tools/index';
import { lfGetItem, lfSetItem } from '../storage/index';

export type ImageHash = string;

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

export async function getImage(imageHash: ImageHash): Promise<string> {
  let blobURL = '';
  const item = await lfGetItem(1, imageHash);
  if (!images.hasOwnProperty(imageHash)) {
    blobURL = await dataURLToBlobURL(item);
    images[imageHash] = blobURL;
  } else {
    blobURL = images[imageHash];
  }
  return blobURL;
}
