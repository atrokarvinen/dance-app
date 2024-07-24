import express, { NextFunction, Request, Response } from "express";

import { config } from "dotenv";
import { deleteBlob, uploadBlob, uploadBlobTest } from "./blob-controller";

const isDev = process.env.NODE_ENV?.trim() === "development";
console.log("isDev:", isDev);
console.log("env:", process.env.NODE_ENV);

config({ path: isDev ? ".env.local" : ".env" });

const app = express();
app.use(express.json());
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  return res.status(500).json({ message: "error" });
});

app.get("/", (req, res) => {
  const envVar = process.env.MY_TEST_VAR;
  console.log("envVar:", envVar);

  res.send("Hello World!");
});

app.post("/test", (req, res) => {
  const values = req.body;

  console.log("values:", values);
  console.log("values.test:", values.test);

  res.json({ message: "success" });
});

app.post("/blobs", uploadBlob);
app.post("/blobs/test", uploadBlobTest);
app.post("/blobs/delete", deleteBlob);

app.listen(3000, () => {
  console.log("app running");
});
