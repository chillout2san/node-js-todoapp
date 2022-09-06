import { Todo } from "../../../domain_layer/todo/todo.js";
import { TodoRepository } from "../../../infrastructure_layer/todo/todo_repository.js";
import { InputDto, OutPutDto } from "./create_dto.js";

export class CreateUseCase {
  todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository) {
    this.todoRepository = todoRepository;
  }

  exec(inputDto: InputDto): OutPutDto {
    const { title, status, content } = inputDto;

    const newTodo = new Todo("", title, status, content);

    if (!newTodo.isValid()) {
      return {
        hasError: false,
        message: "",
      };
    }

    return newTodo.create(this.todoRepository);
  }
}
