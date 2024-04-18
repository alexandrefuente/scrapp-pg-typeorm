import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  views: number;

  @Column()
  ispublished: boolean;

  @ManyToOne(() => User, (user) => user.posts)
  user: User
}