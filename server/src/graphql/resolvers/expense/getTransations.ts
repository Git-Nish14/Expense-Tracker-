import {
  Resolver,
  Query,
  Ctx,
  Arg,
  Int,
  ObjectType,
  Field,
  Float,
} from "type-graphql";
import prisma from "../../../config/db";
import { MyContext } from "../../../types/context";

@ObjectType()
class Transaction {
  @Field()
  id: string;

  @Field()
  date: Date;

  @Field()
  title: string;

  @Field()
  category: string;

  @Field(() => Float)
  amount: number;

  @Field()
  type: string;
}

@Resolver()
export class GetTransactionsResolver {
  @Query(() => [Transaction])
  async transactions(
    @Ctx() ctx: MyContext,
    @Arg("skip", () => Int, { defaultValue: 0 }) skip: number,
    @Arg("take", () => Int, { defaultValue: 10 }) take: number
  ) {
    if (!ctx.userId) {
      throw new Error("Not authenticated");
    }

    const expenses = await prisma.expense.findMany({
      where: { userId: ctx.userId },
      orderBy: { date: "desc" },
      skip,
      take,
      select: {
        id: true,
        date: true,
        title: true,
        category: true,
        amount: true,
      },
    });

    const incomes = await prisma.income.findMany({
      where: { userId: ctx.userId },
      orderBy: { date: "desc" },
      skip,
      take,
      select: {
        id: true,
        date: true,
        title: true,
        category: true,
        amount: true,
      },
    });

    const transactions = [
      ...expenses.map((expense) => ({ ...expense, type: "expense" })),
      ...incomes.map((income) => ({ ...income, type: "income" })),
    ];

    transactions.sort((a, b) => b.date.getTime() - a.date.getTime());

    return transactions.slice(skip, skip + take);
  }
}
