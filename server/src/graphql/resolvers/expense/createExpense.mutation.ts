import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { Expense } from "../../../models/Expense";
import prisma from "../../../config/db";
import { MyContext } from "../../../types/context";

@Resolver()
export class CreateExpenseResolver {
  @Mutation(() => Expense)
  async createExpense(
    @Arg("title") title: string,
    @Arg("description") description: string,
    @Arg("start") start: Date,
    @Arg("userId") userId: string,
    @Arg("category") category: string,
    @Ctx() ctx: MyContext
  ) {
    if (!ctx.userId) {
      throw new Error("Not authenticated");
    }

    // Ensure user exists before creating an expense
    const existingUser = await prisma.user.findUnique({
      where: { id: ctx.userId },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    // Create the expense and include user details
    const expense = await prisma.expense.create({
      data: {
        title,
        description,
        start,
        user: {
          connect: { id: userId },
        },
      },
      include: { user: true }, // Ensure user is fetched to avoid null error
    });

    // Emit expense to all connected clients
    ctx.io.emit("newExpense", expense);

    return expense;
  }
}
