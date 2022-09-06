import express from "express";
import { StatusType, Todo } from "../../../domain_layer/todo/todo.js";
import { database } from "../../../infrastructure_layer/database.js";
import { TodoRepository } from "../../../infrastructure_layer/todo/todo_repository.js";
import { CreateUseCase } from "../../../usecase_layer/todo/create/create_usecase.js";

export const todoRouter = express.Router();

const todoRepository = new TodoRepository(database);

interface CreateRequest {
  title: string;
  status: StatusType;
  content: string;
}

interface CreateResponse {
  hasError: boolean;
  message: string;
}

todoRouter.post(
  "/create",
  (
    req: express.Request<CreateRequest>,
    res: express.Response<CreateResponse>
  ) => {
    const createUseCase = new CreateUseCase(todoRepository);
    const result = createUseCase.exec({
      title: req.body.title,
      status: req.body.status,
      content: req.body.content,
    });

    if (result.hasError) {
      // TODO: クライアントエラーかサーバエラーか判断したい
      res.status(500).send(result);
      return;
    }
    res.status(200).send(result);
  }
);
