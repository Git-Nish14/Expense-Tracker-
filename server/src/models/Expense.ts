import { ObjectType, Field, ID, Float, GraphQLISODateTime } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class Expense {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field(() => Float)
  amount!: number;

  @Field()
  category!: string; // Added Category Field

  @Field()
  type!: string;

  @Field(() => GraphQLISODateTime)
  date!: Date;

  @Field(() => User)
  user!: User;

  @Field()
  userId!: string;
}
