import { Resolver, Query, Ctx } from "type-graphql";
import prisma from "../../../config/db";
import { Expense } from "../../../models/Expense";
import { MyContext } from "../../../types/context";

@Resolver()
export class GetExpensesResolver {
  @Query(() => [Expense])
  async getExpenses(@Ctx() ctx: MyContext) {
    if (!ctx.userId) {
      throw new Error("Not authenticated");
    }
    const expenses = await prisma.expense.findMany({
      where: { userId: ctx.userId },
    });
    return expenses;
  }
}
