import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { faker } from "@faker-js/faker";
import { User } from "../entity/User";
import { Post } from "../entity/Post";

export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const postsRepository = dataSource.getRepository(Post);
    
    const userFactory = factoryManager.get(User);
    const postsFactory = factoryManager.get(Post);
    
    const users = await userFactory.saveMany(7);

    const posts = await Promise.all(
      Array(17)
        .fill("")
        .map(async () => {
          const made = await postsFactory.make({
            user: faker.helpers.arrayElement(users),
          });
          return made;
        }),
    );
    await postsRepository.save(posts);
  }
}