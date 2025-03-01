import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { Expense } from "../../../models/Expense";
import prisma from "../../../config/db";
import { MyContext } from "../../../types/context";

@Resolver()
export class CreateExpenseResolver {
  @Mutation(() => Expense)
  async createExpense(
    @Arg("title") title: string,
    @Arg("amount") amount: number,
    @Arg("category") category: string,
    @Arg("type") type: string,
    @Arg("date") date: Date,
    @Arg("userId") userId: string,
    @Ctx() ctx: MyContext
  ) {
    if (!ctx.userId) {
      throw new Error("Not authenticated");
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: ctx.userId },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    const expense = await prisma.expense.create({
      data: {
        title,
        amount,
        category,
        type,
        date,
        user: { connect: { id: userId } },
      },
      include: { user: true },
    });

    return expense;
  }
}
