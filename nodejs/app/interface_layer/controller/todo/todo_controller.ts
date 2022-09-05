import express from "express";

export const todoRouter = express.Router();

interface CreateRequest {}

interface CreateResponse {}

todoRouter.post(
  "/create",
  (
    res: express.Request<CreateRequest>,
    req: express.Response<CreateResponse>
  ) => {
    req.send("hoge");
  }
);
