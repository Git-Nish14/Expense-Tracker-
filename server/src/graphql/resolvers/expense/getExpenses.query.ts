import { Resolver, Query, Ctx, Arg, Int } from "type-graphql";
import prisma from "../../../config/db";
import { Expense } from "../../../models/Expense";
import { MyContext } from "../../../types/context";

@Resolver()
export class GetExpensesResolver {
  @Query(() => [Expense])
  async getExpenses(
    @Ctx() ctx: MyContext,
    @Arg("skip", () => Int, { defaultValue: 0 }) skip: number,
    @Arg("take", () => Int, { defaultValue: 10 }) take: number
  ) {
    if (!ctx.userId) {
      throw new Error("Not authenticated");
    }

    return await prisma.expense.findMany({
      where: { userId: ctx.userId },
      orderBy: { date: "desc" },
      skip,
      take,
    });
  }
}
