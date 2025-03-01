import { Resolver, Mutation, Ctx } from "type-graphql";
import prisma from "../../../config/db";
import { MyContext } from "../../../types/context";

@Resolver()
export class DeleteIncomesResolver {
  @Mutation(() => String)
  async deleteIncomes(@Ctx() ctx: MyContext) {
    if (!ctx.userId) {
      throw new Error("Not authenticated");
    }

    // Delete only incomes that belong to the authenticated user
    const { count } = await prisma.income.deleteMany({
      where: { userId: ctx.userId },
    });

    if (count === 0) {
      throw new Error("No incomes found to delete");
    }

    return `${count} incomes deleted`;
  }
}
