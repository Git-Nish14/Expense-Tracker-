import { ObjectType, Field, ID, Float } from "type-graphql";
import { Transaction } from "./Transaction";

@ObjectType()
export class User {
  @Field(() => ID)
  id!: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  email!: string;

  @Field(() => [Transaction])
  transactions: Transaction[] = [];
}
