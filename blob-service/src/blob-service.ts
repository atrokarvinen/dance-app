import { del, put } from "@vercel/blob";

export class BlobService {
  token: string;

  constructor() {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      throw new Error("BLOB_READ_WRITE_TOKEN is not set");
    }
    this.token = token;
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
    console.log(`Deleting file '${url}' from Vercel...`);

    const isVercelUrl = this.isVercelUrl(url);
    if (!isVercelUrl) {
      console.log("Not a Vercel Blob storage URL. Skipping delete.");
      return;
    }

    await del(url, { token: this.token });

    console.log(`Delete successful`);
  }

  isVercelUrl(url: string) {
    return url.includes("public.blob.vercel-storage.com");
  }
}
