import compress from "browser-image-compression";

export const preprocessFileList = async (files: FileList | undefined) => {
  if (!files) return;
  if (files.length === 0) return;
  return preprocessFile(files[0]);
};

const preprocessFile = async (file: File) => {
  console.log("original size:", file.size);
  const compressedFile = await compress(file, {
    maxSizeMB: 0.1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  });
  console.log("compressedFile size:", compressedFile.size);

  const imageBase64 = await fileToBase64(compressedFile);

  return imageBase64;
};

const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        console.log("Invalid reader result:", reader.result);
        resolve("N/A");
        return;
      }
      resolve(reader.result);
    };
    reader.onerror = reject;
  });
