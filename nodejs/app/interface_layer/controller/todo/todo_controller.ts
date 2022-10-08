import express from "express";
import { TodoType } from "../../../domain_layer/todo/todo.js";
import { database } from "../../../infrastructure_layer/database.js";
import { TodoRepository } from "../../../infrastructure_layer/todo/todo_repository.js";
import { CreateUseCase } from "../../../usecase_layer/todo/create/create_usecase.js";
import { FetchAllUseCase } from "../../../usecase_layer/todo/fetch_all/fetch_all_usecase.js";

export const todoController = express.Router();

const todoRepository = new TodoRepository(database());

// create

interface CreateRequest {
  title: string;
  content: string;
}

interface CreateResponse {
  hasError: boolean;
  errorMessage: string;
}
todoController.post(
  "/create",
  async (req: express.Request, res: express.Response<CreateResponse>) => {
    const createUseCase = new CreateUseCase(todoRepository);

    const body = req.body as CreateRequest;

    try {
      await createUseCase.exec({
        title: body.title,
        content: body.content,
      });
      res.status(200).send({
        hasError: false,
        errorMessage: "",
      });
    } catch (error) {
      res.status(500).send({
        hasError: true,
        errorMessage: `error: ${error}`,
      });
    }
  }
);

// fetch-all

interface FetchAllResponse {
  hasError: boolean;
  errorMessage: string;
  todos: TodoType[];
}
todoController.post(
  "/fetch-all",
  async (req: express.Request, res: express.Response<FetchAllResponse>) => {
    const fetchAllUseCase = new FetchAllUseCase(todoRepository);

    try {
      const result = await fetchAllUseCase.exec();
      res.status(200).send({
        hasError: false,
        errorMessage: "",
        todos: result.todos,
      });
    } catch (error) {
      res.status(500).send({
        hasError: true,
        errorMessage: `error: ${error}`,
        todos: [],
      });
    }
  }
);
