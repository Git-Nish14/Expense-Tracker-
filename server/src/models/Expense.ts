import { ObjectType, Field, ID, GraphQLISODateTime } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class Expense {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => GraphQLISODateTime)
  start!: Date;

  @Field(() => User)
  user!: User;

  @Field()
  userId!: string;
}
