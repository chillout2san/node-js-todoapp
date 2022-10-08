import { Connection } from "mysql2/promise.js";
import { TodoType } from "../../domain_layer/todo/todo.js";

export class TodoRepository {
  database: Promise<Connection>;

  constructor(database: Promise<Connection>) {
    this.database = database;
  }

  /**
   * 新しいtodoを作成する
   * @param todo 新しいtodoオブジェクト
   * @returns
   */
  async create(todo: TodoType) {
    const sql = "INSERT INTO todos SET ?";

    const { id, title, status, content } = todo;

    await (await this.database).query(sql, { id, title, status, content });
  }

  /**
   * 全てのtodoを取得する
   * @returns
   */
  async fetchAll() {
    const sql = "SELECT * FROM todos";

    const result = await (await this.database).query(sql);
    // TODO: 型キャストがヤバいので何とかしたい
    return {
      todos: result[0] as unknown as TodoType[],
    };
  }
}
