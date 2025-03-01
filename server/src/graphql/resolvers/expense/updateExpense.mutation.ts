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
    @Arg("amount", { nullable: true }) amount?: number,
    @Arg("category", { nullable: true }) category?: string,
    @Arg("type", { nullable: true }) type?: string,
    @Arg("date", { nullable: true }) date?: Date
  ) {
    if (!ctx.userId) {
      throw new Error("Not authenticated");
    }

    const existingExpense = await prisma.expense.findUnique({ where: { id } });

    if (!existingExpense) {
      throw new Error("Expense not found");
    }

    if (existingExpense.userId !== ctx.userId) {
      throw new Error("You do not have permission to edit this expense");
    }

    const updatedExpense = await prisma.expense.update({
      where: { id },
      data: {
        title: title ?? existingExpense.title,
        amount: amount ?? existingExpense.amount,
        category: category ?? existingExpense.category,
        type: type ?? existingExpense.type,
        date: date ?? existingExpense.date,
      },
    });

    return updatedExpense;
  }
}
