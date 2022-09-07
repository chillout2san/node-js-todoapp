import { TodoRepository } from "../../infrastructure_layer/todo/todo_repository.js";
import { createUlid } from "../../utils/ulid.js";

export const statusList = {
  DONE: "完了",
  WORK_ON_PROGRESS: "作業中",
  UN_ASSIGNED: "未確認",
} as const;

export type StatusType = typeof statusList[keyof typeof statusList];

export interface TodoType {
  id: string;
  title: string;
  status: StatusType;
  content: string;
}

export class Todo {
  private readonly id: TodoType["id"] = "";
  private title: TodoType["title"] = "";
  private status: TodoType["status"] = statusList.UN_ASSIGNED;
  private content: TodoType["content"] = "";

  constructor(
    id: string,
    title: string,
    status: StatusType | "",
    content: string
  ) {
    if (id === "") {
      this.id = createUlid();
    }

    if (title === "") {
      return;
    }
    this.title = title;

    if (status === "") {
      return;
    }
    this.status = status;

    if (content === "") {
      return;
    }
    this.content = content;
  }

  /**
   * 有効にインスタンス化されたか判定する
   * @returns
   */
  public isValid() {
    if (this.id === "" || this.title === "") {
      return false;
    }
    return true;
  }

  /**
   * todoオブジェクトのプロパティを全て返却する
   * @returns
   */
  getAll() {
    return {
      id: this.id,
      title: this.title,
      status: this.status,
      content: this.content,
    };
  }

  /**
   * idを返却する
   * @returns
   */
  getId() {
    return this.id;
  }

  /**
   * titleを返却する
   * @returns
   */
  getTitle() {
    return this.title;
  }

  /**
   * statusを返却する
   * @returns
   */
  getStatus() {
    return this.status;
  }

  /**
   * contentを返却する
   * @returns
   */
  getContent() {
    return this.content;
  }

  /**
   * titleをセットする
   * @param title 新しいtitle
   */
  setTitle(title: string) {
    this.title = title;
  }

  /**
   * statusをセットする
   * @param status 新しいstatus
   */
  setStatus(status: StatusType) {
    this.status = status;
  }

  /**
   * contentをセットする
   * @param content 新しいcontent
   */
  setContent(content: string) {
    this.content = content;
  }
}
