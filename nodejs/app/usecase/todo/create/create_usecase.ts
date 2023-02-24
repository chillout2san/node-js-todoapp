import { TodoFactory } from "../../../domain/todo/todo.js";
import { TodoRepository } from "../../../infrastructure/todo/todo_repository.js";
import { InputDto } from "./create_dto.js";

export class CreateUseCase {
  todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository) {
    this.todoRepository = todoRepository;
  }

  async exec(inputDto: InputDto) {
    const { title, content } = inputDto;

    const newTodo = TodoFactory.create(title, content);

    await this.todoRepository.create({
      ...newTodo.getAllProperty(),
    });
  }
}
