import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import prisma from "../../../config/db";
import { Expense } from "../../../models/Expense";
import { MyContext } from "../../../types/context";

@Resolver()
export class UpdateExpenseResolver {
  @Mutation(() => Expense)
  async updateExpense(
    @Arg("id") id: string,
    @Ctx() ctx: MyContext,
    @Arg("title", { nullable: true }) title?: string,
    @Arg("description", { nullable: true }) description?: string,
    @Arg("start", { nullable: true }) start?: Date
  ) {
    if (!ctx.userId) {
      throw new Error("Not authenticated");
    }

    const existingExpense = await prisma.expense.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!existingExpense) {
      throw new Error("Expense not found");
    }

    if (existingExpense.userId !== ctx.userId) {
      throw new Error("You do not have permission to edit this expense");
    }

    const updatedExpenseData = {
      title: title ?? existingExpense.title,
      description: description ?? existingExpense.description,
      start: start ?? existingExpense.start,
    };

    const updatedExpense = await prisma.expense.update({
      where: { id },
      data: updatedExpenseData,
      include: { user: true },
    });

    // Emit expense update to all connected clients
    ctx.io.emit("updateExpense", updatedExpense);

    return updatedExpense;
  }
}
