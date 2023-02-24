import { Connection } from "mysql2/promise.js";
import { TodoType } from "../../domain/todo/todo.js";

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

  /**
   * 対象のtodoを取得する
   * @param id 対象のtodo
   * @returns
   */
  async getById(id: string) {
    const sql = "SELECT * FROM todos WHERE id = ?";

    const result = await (await this.database).query(sql, id);
    // TODO: 型キャストがヤバいので何とかしたい
    return {
      todo: result[0] as unknown as TodoType[],
    };
  }

  /**
   * 対象のtodoを削除する
   * @param id 対象のtodoのid
   */
  async delete(id: string) {
    const sql = "DELETE FROM todos WHERE id = ?";

    await (await this.database).query(sql, id);
  }
}
