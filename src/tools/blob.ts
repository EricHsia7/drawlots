async function blobToBase64(blob: Blob): Promise<string> {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Data = reader.result.split(',')[1]; // Strip out the prefix
      resolve(base64Data);
    };

    reader.onerror = reject;
    reader.readAsDataURL(blob); // Reads the blob as a Base64 encoded data URL
  });
}

export async function blobToDataURL(blob: Blob, mimeType: string = ''): Promise<string> {
  const base64EncodedContent = await blobToBase64(blob);
  const dataURL = `data:${mimeType};base64,${base64EncodedContent}`;
  return dataURL;
}

async function base64ToBlob(base64: string, mimeType: string = ''): Promise<Blob> {
  return await new Promise((resolve, reject) => {
    try {
      const byteCharacters = atob(base64); // Decode base64 to binary string
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      resolve(new Blob([byteArray], { type: mimeType }));
    } catch (error) {
      reject(error);
    }
  });
}

export async function dataURLToBlobURL(dataURL: string): Promise<string> {
  const regex = /^data:(.*?)(;base64)?,(.*)$/;
  const match = dataURL.match(regex);
  if (match) {
    const mimeType = match[1] || 'text/plain';
    const isBase64 = !!match[2];
    const content = match[3];
    if (isBase64) {
      const fileBlob = await base64ToBlob(content, mimeType);
      const blobURL = URL.createObjectURL(fileBlob);
      return blobURL;
    }
  }
  return '';
}
