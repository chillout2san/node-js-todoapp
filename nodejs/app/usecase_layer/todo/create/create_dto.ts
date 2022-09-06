import { StatusType } from "../../../domain_layer/todo/todo.js";

export interface InputDto {
  title: string;
  status: StatusType;
  content: string;
}

export interface OutPutDto {
  hasError: boolean;
  message: string;
}
