import { Field, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

@ObjectType()
@Entity()
@Unique(["email"])
export class User {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public readonly id!: number;

  @Field()
  @Column({ type: "varchar" })
  public name!: string;

  @Field()
  @Column({ type: "varchar" })
  public email!: string;

  @Field()
  @Column({ type: "varchar" })
  public password!: string;

  @Field()
  @Column({ type: "varchar" })
  public token!: string;

  @Field()
  @CreateDateColumn()
  public createdAt!: Date;
}
