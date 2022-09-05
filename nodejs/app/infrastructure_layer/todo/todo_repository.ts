import mysql from "mysql2";
import { StatusType } from "../../domain_layer/todo/todo";

export class TodoRepository {
  database: mysql.Connection;

  constructor(database: mysql.Connection) {
    this.database = database;
  }

  create(id: string, title: string, status: StatusType, content: string) {
    const sql = "INSERT INTO todos SET ?";

    try {
      this.database.query(sql, { id, title, status, content }, (error) => {
        if (error) {
          throw error;
        }
      });
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
}
