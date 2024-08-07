import express from "express";

import { config } from "dotenv";
import { getBlobRouter } from "./blob-router";
import { authMiddleware } from "./middleware/authMiddleware";

const isDev = process.env.NODE_ENV?.trim() === "development";
console.log("isDev:", isDev);
console.log("env:", process.env.NODE_ENV);

config({ path: isDev ? ".env.local" : ".env" });

const app = express();

app.use(express.json({ limit: "2mb" }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/blobs", authMiddleware, getBlobRouter());

app.listen(3000, () => {
  console.log("App running");
});
