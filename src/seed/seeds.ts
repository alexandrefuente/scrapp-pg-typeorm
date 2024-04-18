import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { User } from "../entity/User";
import { Post } from "../entity/Post";
import { UsersFactory } from "./factories/user.factory";
import { PostsFactory } from "./factories/post.factory";
import MainSeeder from "./main.seed";

require("dotenv").config();

const {
  DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME,
} = process.env;

const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: DB_HOST || "localhost",
  port: Number(DB_PORT) || 5432,
  username: DB_USER || "test",
  password: DB_PASSWORD || "test",
  database: DB_NAME || "test",
  entities: [User, Post],
  // additional config options brought by typeorm-extension
  factories: [UsersFactory, PostsFactory],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});