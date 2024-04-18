import { AppDataSource } from "./data-source"
import { User } from "./entity/User"

AppDataSource.initialize().then(async () => {

    console.log("Starting database...")
    /**
     * Query to show the user owner of each post created
     */
    const users = await AppDataSource.getRepository(User)
        .createQueryBuilder('user')
        .select(['user.name as Author'])
        .leftJoin('user.posts', 'post')
        .addSelect(['post.title as Title', 'post.views as Views'])
        .orderBy('user.name')
        .getRawMany();
    console.table(users)
}).catch(error => console.log(error))
