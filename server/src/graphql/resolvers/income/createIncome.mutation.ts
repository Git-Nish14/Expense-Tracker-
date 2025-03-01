import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { Income } from "../../../models/Income";
import prisma from "../../../config/db";
import { MyContext } from "../../../types/context";

@Resolver()
export class CreateIncomeResolver {
  @Mutation(() => Income)
  async createIncome(
    @Arg("title") title: string,
    @Arg("amount") amount: number,
    @Arg("category") category: string,
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

    const income = await prisma.income.create({
      data: {
        title,
        amount,
        category,
        date,
        user: { connect: { id: userId } },
      },
      include: { user: true },
    });

    return income;
  }
}
