import { Todo } from "./todo";

export interface ITodoRepository {
  getTodos: () => Todo[];
}
