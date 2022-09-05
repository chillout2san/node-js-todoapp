import { createUlid } from "../../utils/ulid.js";

export const statusList = {
  DONE: "完了",
  WORK_ON_PROGRESS: "作業中",
  UN_ASSIGNED: "未確認",
} as const;

export type StatusType = typeof statusList[keyof typeof statusList];

export class Todo {
  private readonly id: string = "";
  private title: string = "";
  private status: StatusType | "" = "";
  private content: string = "";

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
    if (this.id === "" || this.title === "" || this.status === "") {
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
   * todoオブジェクトの指定のプロパティ一つを返却する
   * @param property todoオブジェクトの任意のプロパティ名
   * @returns
   */
  getProperty(property: "id" | "title" | "status" | "content") {
    return this[property];
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
