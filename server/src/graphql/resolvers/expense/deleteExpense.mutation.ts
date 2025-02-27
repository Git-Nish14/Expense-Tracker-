import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import prisma from "../../../config/db";
import { MyContext } from "../../../types/context";

@Resolver()
export class DeleteExpenseResolver {
  @Mutation(() => String)
  async deleteExpense(@Arg("id") id: string, @Ctx() ctx: MyContext) {
    if (!ctx.userId) {
      throw new Error("Not authenticated");
    }

    const existingExpense = await prisma.expense.findUnique({
      where: { id },
    });

    if (!existingExpense) {
      throw new Error("Expense not found");
    }

    if (existingExpense.userId !== ctx.userId) {
      throw new Error("You do not have permission to delete this expense");
    }

    await prisma.expense.delete({ where: { id } });

    // Emit expense deletion to all connected clients
    ctx.io.emit("deleteExpense", { id });

    return "Expense deleted";
  }
}
