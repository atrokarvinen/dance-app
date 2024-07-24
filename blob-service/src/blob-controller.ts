import { NextFunction, Request, Response } from "express";
import { BlobService } from "./blob-service";

export const uploadBlob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, fileBase64 } = req.body;

    console.log("name:", name);
    console.log("fileBase64:", fileBase64);

    const file = await base64ToBlob(fileBase64);

    console.log("file:", file);

    const service = new BlobService();
    const blob = await service.uploadBlob(name, file);
    return res.json({ message: "success", blob });
  } catch (error) {
    return next(error);
  }
};

const base64ToBlob = async (base64: string) => {
  const blob = await fetch(base64)
    .then((res) => res.blob())
    .then((blob) => {
      console.log("blob:", blob);
      return blob;
    });
  return blob;
};

export const uploadBlobTest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const service = new BlobService();
    const blob = await service.uploadBlobTest();
    return res.json({ message: "success", blob: blob });
  } catch (error) {
    return next(error);
  }
};

export const deleteBlob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { url } = req.body;
    const service = new BlobService();
    await service.deleteBlob(url);
    return res.json({ message: "success" });
  } catch (error) {
    return next(error);
  }
};
