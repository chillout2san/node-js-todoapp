import { StatusType, Todo } from "./todo";

export interface ITodoRepository {
  create: (title: string, status: StatusType, content: string) => void;
}
