import { TodoType } from "../../../domain_layer/todo/todo";

export interface OutPutDto {
  hasError: boolean;
  message: string;
  todos: TodoType[];
}
