import { ObjectType, Field, ID, Float } from "type-graphql";
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

  @Field(() => Float)
  budget!: number;

  @Field(() => Float)
  income!: number;

  @Field(() => [Expense])
  expenses: Expense[] = [];
}
