export async function blobToBase64(blob: Blob): Promise<string> {
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
