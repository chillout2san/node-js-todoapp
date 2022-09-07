import { Todo } from "../../../domain_layer/todo/todo.js";
import { TodoRepository } from "../../../infrastructure_layer/todo/todo_repository.js";
import { InputDto, OutPutDto } from "./create_dto.js";

export class CreateUseCase {
  todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository) {
    this.todoRepository = todoRepository;
  }

  async exec(inputDto: InputDto): Promise<OutPutDto> {
    const { title, status, content } = inputDto;

    const newTodo = new Todo("", title, status, content);

    if (!newTodo.isValid()) {
      return {
        hasError: false,
        message: "",
      };
    }

    return await this.todoRepository.create(
      newTodo.getId(),
      newTodo.getTitle(),
      newTodo.getStatus(),
      newTodo.getContent()
    );
  }
}
