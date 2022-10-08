import { createUlid } from "../../utils/ulid";

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

class Todo {
  private readonly id: TodoType["id"];
  private title: TodoType["title"];
  private status: TodoType["status"];
  private content: TodoType["content"];

  constructor(id: string, title: string, status: StatusType, content: string) {
    if (id === "" || title === "") {
      throw {
        errorMessage: "idとtitleは必須項目です。",
      };
    }

    this.id = id;
    this.title = title;
    this.status = status;
    this.content = content;
  }

  /**
   * todoオブジェクトのプロパティを全て返却する
   * @returns
   */
  getAllProperty() {
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

const create = (title: string, content: string) => {
  const id = createUlid();
  const status = statusList.UN_ASSIGNED;
  return new Todo(id, title, status, content);
};

const parse = (
  id: string,
  title: string,
  status: StatusType,
  content: string
) => {
  return new Todo(id, title, status, content);
};

export const TodoFactory = {
  create,
  parse,
};
