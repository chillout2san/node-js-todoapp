import express from "express";
import { resourceLimits } from "worker_threads";
import { StatusType, Todo } from "../../../domain_layer/todo/todo.js";
import { database } from "../../../infrastructure_layer/database.js";
import { TodoRepository } from "../../../infrastructure_layer/todo/todo_repository.js";
import { CreateUseCase } from "../../../usecase_layer/todo/create/create_usecase.js";
import { FetchAllUseCase } from "../../../usecase_layer/todo/fetch_all/fetch_all_usecase.js";

export const todoRouter = express.Router();

const todoRepository = new TodoRepository(database());

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
  async (
    req: express.Request<CreateRequest>,
    res: express.Response<CreateResponse>
  ) => {
    const createUseCase = new CreateUseCase(todoRepository);
    const result = await createUseCase.exec({
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

interface FetchAllRequest {}

interface FetchAllResponse {
  hasError: boolean;
  message: string;
  todos: any[];
}

todoRouter.post(
  "/fetch-all",
  async (
    req: express.Request<FetchAllRequest>,
    res: express.Response<FetchAllResponse>
  ) => {
    const fetchAllUseCase = new FetchAllUseCase(todoRepository);
    const result = await fetchAllUseCase.exec();

    if (result.hasError) {
      res.status(500).send(result);
      return;
    }
    return res.status(200).send(result);
  }
);
