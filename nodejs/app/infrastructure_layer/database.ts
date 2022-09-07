import mysql from "mysql2/promise";

export const database = async () => {
  return await mysql.createConnection({
    host: "db",
    user: "root",
    password: "root_password",
    database: "todoapp",
  });
};
