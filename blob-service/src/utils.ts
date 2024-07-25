export const base64ToBlob = async (base64: string) => {
  try {
    const blob = await fetch(base64).then((res) => res.blob());
    console.log("Converted base64 to blob");
    return blob;
  } catch (error) {
    console.log("Error converting base64 to blob:", error);
    throw new Error("Error converting base64 to blob");
  }
};
