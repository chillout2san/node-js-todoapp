import mysql from "mysql2";

export const database = mysql.createConnection({
  host: "db",
  user: "root",
  password: "root_password",
  database: "todoapp",
});
