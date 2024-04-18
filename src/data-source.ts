import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Post } from "./entity/Post"

require("dotenv").config();

const {
    DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME,
  } = process.env;
export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST || "localhost",
    port: Number(DB_PORT) || 5432,
    username: DB_USER || "test",
    password: DB_PASSWORD || "test",
    database: DB_NAME || "test",
    synchronize: false,
    logging: false,
    entities: [User, Post],
    migrations: [],
    subscribers: [],
})
