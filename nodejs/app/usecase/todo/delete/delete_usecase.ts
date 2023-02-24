import { TodoRepository } from "../../../infrastructure/todo/todo_repository";
import { InputDto } from "./delete_dto";

export class DeleteUseCase {
  todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository) {
    this.todoRepository = todoRepository;
  }

  async exec(inputDto: InputDto) {
    const { id } = inputDto;
    const result = await this.todoRepository.getById(id);

    if (result.todo.length === 0) {
      throw "対象のtodoが存在しません。";
    }

    await this.todoRepository.delete(id);
  }
}
