import { Todo } from "../../../domain_layer/todo/todo.js";
import { TodoRepository } from "../../../infrastructure_layer/todo/todo_repository.js";
import { OutPutDto } from "./fetch_all_dto.js";

export class FetchAllUseCase {
  todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository) {
    this.todoRepository = todoRepository;
  }

  exec(): Promise<OutPutDto> {
    return this.todoRepository.fetchAll();
  }
}