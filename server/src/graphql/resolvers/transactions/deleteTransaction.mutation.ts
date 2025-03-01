import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import prisma from "../../../config/db";
import { MyContext } from "../../../types/context";

@Resolver()
export class DeleteTransactionResolver {
  @Mutation(() => String)
  async deleteTransaction(@Arg("id") id: string, @Ctx() ctx: MyContext) {
    if (!ctx.userId) {
      throw new Error("❌ Not authenticated");
    }

    // ✅ Find the transaction by ID
    const existingTransaction = await prisma.transactions.findUnique({
      where: { id },
    });

    if (!existingTransaction) {
      throw new Error("❌ Transaction not found");
    }

    // ✅ Ensure only the owner can delete their transaction
    if (existingTransaction.userId !== ctx.userId) {
      throw new Error(
        "❌ You do not have permission to delete this transaction"
      );
    }

    // ✅ Delete the transaction
    await prisma.transactions.delete({ where: { id } });

    return "✅ Transaction deleted successfully";
  }
}
