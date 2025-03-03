import { Resolver, Mutation, Ctx } from "type-graphql";
import prisma from "../../../config/db";
import { MyContext } from "../../../types/context";

@Resolver()
export class DeleteTransactionsResolver {
  @Mutation(() => String)
  async deleteTransactions(@Ctx() ctx: MyContext) {
    if (!ctx.userId) {
      throw new Error("❌ Not authenticated");
    }
    const { count } = await prisma.transactions.deleteMany({
      where: { userId: ctx.userId },
    });

    if (count === 0) {
      throw new Error("❌ No transactions found to delete");
    }

    return `✅ ${count} transactions deleted successfully`;
  }
}
