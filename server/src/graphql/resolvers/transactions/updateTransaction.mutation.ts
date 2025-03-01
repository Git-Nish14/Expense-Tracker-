import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import prisma from "../../../config/db";
import { Transaction } from "../../../models/Transaction"; // ✅ Import the correct model
import { MyContext } from "../../../types/context";

@Resolver()
export class UpdateTransactionResolver {
  @Mutation(() => Transaction)
  async updateTransaction(
    @Arg("id") id: string,
    @Ctx() ctx: MyContext,
    @Arg("title", { nullable: true }) title?: string,
    @Arg("amount", { nullable: true }) amount?: number,
    @Arg("category", { nullable: true }) category?: string,
    @Arg("isIncome", { nullable: true }) isIncome?: boolean, // ✅ Updated from 'type'
    @Arg("date", { nullable: true }) date?: string // ✅ Keeping date as string for consistency
  ) {
    if (!ctx.userId) {
      throw new Error("❌ Not authenticated");
    }

    // ✅ Find the existing transaction
    const existingTransaction = await prisma.transactions.findUnique({
      where: { id },
    });

    if (!existingTransaction) {
      throw new Error("❌ Transaction not found");
    }

    // ✅ Ensure only the owner can update their transaction
    if (existingTransaction.userId !== ctx.userId) {
      throw new Error("❌ You do not have permission to edit this transaction");
    }

    // ✅ Convert date to ISO format if provided
    const formattedDate = date
      ? new Date(date).toISOString()
      : existingTransaction.date.toISOString();

    // ✅ Update transaction
    const updatedTransaction = await prisma.transactions.update({
      where: { id },
      data: {
        title: title ?? existingTransaction.title,
        amount: amount ?? existingTransaction.amount,
        category: category ?? existingTransaction.category,
        isIncome: isIncome ?? existingTransaction.isIncome,
        date: formattedDate,
      },
    });

    return updatedTransaction;
  }
}
