import { del, put } from "@vercel/blob";
import fs from "fs";

export class BlobService {
  token: string;

  constructor() {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      throw new Error("BLOB_READ_WRITE_TOKEN is not set");
    }
    this.token = token;
  }

  loadFile(path: string) {
    const file = fs.readFileSync(path);
    console.log("file:", file);
    return file;
  }

  async uploadBlobTest() {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    const imageFile = this.loadFile(
      "C:/Users/atro.karvinen/source/repos/2-omat-projektit/dance-app/blob-service/src/test-image.jpeg"
    );
    const name = "test-image_" + Date.now().toString() + ".jpeg";

    console.log("name:", name);

    console.log("uploading to vercel...");
    const blob = await put(name, imageFile, {
      access: "public",
      token: token,
    });
    console.log("upload successful");

    console.log("blob:", blob);

    return blob;
  }

  async uploadBlob(name: string, file: File | Blob) {
    console.log(`Uploading file '${name}' to Vercel...`);

    const blob = await put(name, file, {
      access: "public",
      token: this.token,
    });

    console.log("Upload successful. Url:", blob.url);

    return blob;
  }

  async deleteBlob(url: string) {
    console.log(`Deleting file '${url}' from vercel...`);

    await del(url, { token: this.token });

    console.log(`Delete successful`);
  }
}
