import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import prisma from "../../../config/db";
import { MyContext } from "../../../types/context";

@Resolver()
export class DeleteIncomeResolver {
  @Mutation(() => String)
  async deleteIncome(@Arg("id") id: string, @Ctx() ctx: MyContext) {
    if (!ctx.userId) {
      throw new Error("Not authenticated");
    }

    const existingIncome = await prisma.income.findUnique({ where: { id } });

    if (!existingIncome) {
      throw new Error("Income not found");
    }

    if (existingIncome.userId !== ctx.userId) {
      throw new Error("You do not have permission to delete this income");
    }

    await prisma.income.delete({ where: { id } });

    return "Income deleted";
  }
}
