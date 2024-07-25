import { PutBlobResult } from "@vercel/blob";
import { Request, Response } from "express";
import { BlobService } from "./blob-service";
import { base64ToBlob } from "./utils";

export class BlobController {
  blobService: BlobService;

  constructor() {
    this.blobService = new BlobService();
  }

  uploadBlob = async (req: Request, res: Response) => {
    let errorMessage: string | undefined;
    let blob: PutBlobResult | undefined;
    try {
      const { name, fileBase64 } = req.body;

      console.log("Name:", name);
      console.log("FileBase64 start:", fileBase64?.slice(0, 10));
      if (!name) throw new Error("File name is required");
      if (!fileBase64) throw new Error("FileBase64 is required");

      const file = await base64ToBlob(fileBase64);

      console.log(`File size: ${file.size} bytes`);

      blob = await this.blobService.uploadBlob(name, file);
    } catch (error: any) {
      console.log("Error uploading blob:", error);
      console.log("message:", error.message);
      errorMessage = error.message;
    }

    return res.json({ ...blob, error: errorMessage });
  };

  deleteBlob = async (req: Request, res: Response) => {
    let errorMessage: string | undefined;
    try {
      const { url } = req.body;
      await this.blobService.deleteBlob(url);
    } catch (error: any) {
      console.log("Error deleting blob:", error);
      errorMessage = error.message;
    }
    return res.json({ error: errorMessage });
  };
}
