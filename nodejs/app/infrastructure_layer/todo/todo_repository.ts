import { Connection } from "mysql2/promise.js";
import { StatusType, TodoType } from "../../domain_layer/todo/todo.js";

export class TodoRepository {
  database: Promise<Connection>;

  constructor(database: Promise<Connection>) {
    this.database = database;
  }

  /**
   * 新しいtodoを作成する
   * @param id id
   * @param title タイトル
   * @param status todoの状態
   * @param content todoの中身
   * @returns
   */
  async create(id: string, title: string, status: StatusType, content: string) {
    const sql = "INSERT INTO todos SET ?";

    try {
      await (await this.database).query(sql, { id, title, status, content });
      return {
        hasError: false,
        message: "",
      };
    } catch (error) {
      return {
        hasError: true,
        message: `todo/create is failed: ${error}`,
      };
    }
  }

  async fetchAll() {
    const sql = "SELECT * FROM todos";

    try {
      const result = await (await this.database).query(sql);
      return {
        hasError: false,
        message: "",
        // TODO: 型が壊れているので何とかしたい
        todos: result as unknown as TodoType[],
      };
    } catch (error) {
      return {
        hasError: true,
        message: `todo/fetch-all is failed: ${error}`,
        todos: [] as TodoType[],
      };
    }
  }
}
