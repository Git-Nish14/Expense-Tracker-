import { ObjectType, Field, ID } from "type-graphql";
import { Expense } from "./Expense";

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

  @Field(() => [Expense], { nullable: true })
  expenses?: Expense[];
}

@ObjectType()
export class Token {
  @Field()
  token!: string;
}
