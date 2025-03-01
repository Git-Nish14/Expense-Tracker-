import { ObjectType, Field, ID, Float, GraphQLISODateTime } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class Transaction {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field(() => Float)
  amount!: number;

  @Field()
  category!: string;

  @Field(() => GraphQLISODateTime)
  date!: Date;

  @Field()
  isIncome!: boolean;
  @Field(() => User)
  user!: User;

  @Field()
  userId!: string;
}
