import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";

import { Post } from "../../entity/Post"; 

export const PostsFactory = setSeederFactory(Post, (faker: Faker) => {
  const post = new Post();
  post.title = faker.lorem.sentence();
  post.description = faker.lorem.sentence();
  post.views = faker.number.int({ max: 100 });
  post.ispublished = faker.datatype.boolean();
  return post;
});