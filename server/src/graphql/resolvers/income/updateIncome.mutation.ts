import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import prisma from "../../../config/db";
import { Income } from "../../../models/Income";
import { MyContext } from "../../../types/context";

@Resolver()
export class UpdateIncomeResolver {
  @Mutation(() => Income)
  async updateIncome(
    @Arg("id") id: string,
    @Ctx() ctx: MyContext,
    @Arg("title", { nullable: true }) title?: string,
    @Arg("amount", { nullable: true }) amount?: number,
    @Arg("category", { nullable: true }) category?: string,
    @Arg("date", { nullable: true }) date?: Date
  ) {
    if (!ctx.userId) {
      throw new Error("Not authenticated");
    }

    const existingIncome = await prisma.income.findUnique({ where: { id } });

    if (!existingIncome) {
      throw new Error("Income not found");
    }

    if (existingIncome.userId !== ctx.userId) {
      throw new Error("You do not have permission to edit this income");
    }

    const updatedIncome = await prisma.income.update({
      where: { id },
      data: {
        title: title ?? existingIncome.title,
        amount: amount ?? existingIncome.amount,
        category: category ?? existingIncome.category,
        date: date ?? existingIncome.date,
      },
    });

    return updatedIncome;
  }
}
