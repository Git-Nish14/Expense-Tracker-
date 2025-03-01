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
  budget!: number; // Added Budget Field

  @Field(() => Float)
  income!: number; // Added Income Field

  @Field(() => [Expense])
  expenses: Expense[] = [];
}
