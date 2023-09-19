import { Field, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Task {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public id!: number;

  @Field()
  @Column({ type: "varchar" })
  public title!: string;

  @Field()
  @Column({ type: "varchar" })
  public description!: string;

  @Field()
  @Column({ type: "boolean",default: false  })
  public is_completed!: boolean;

  @Field()
  @CreateDateColumn()
  public createdAt!: Date;

}
