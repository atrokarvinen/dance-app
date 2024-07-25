import { Router } from "express";
import { BlobController } from "./blob-controller";

export const getBlobRouter = () => {
  const blobRouter = Router();

  const controller = new BlobController();

  blobRouter.get("/", (req, res) => {
    res.send("Hello World from blob!");
  });
  blobRouter.post("/", controller.uploadBlob);
  blobRouter.post("/delete", controller.deleteBlob);

  return blobRouter;
};
