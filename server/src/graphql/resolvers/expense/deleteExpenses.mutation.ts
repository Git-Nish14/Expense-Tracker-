import { Resolver, Mutation, Ctx } from "type-graphql";
import prisma from "../../../config/db";
import { MyContext } from "../../../types/context";

@Resolver()
export class DeleteExpensesResolver {
  @Mutation(() => String)
  async deleteExpenses(@Ctx() ctx: MyContext) {
    if (!ctx.userId) {
      throw new Error("Not authenticated");
    }

    // Delete only expenses that belong to the authenticated user
    const { count } = await prisma.expense.deleteMany({
      where: { userId: ctx.userId },
    });

    if (count === 0) {
      throw new Error("No expenses found to delete");
    }

    return `${count} expenses deleted`;
  }
}
