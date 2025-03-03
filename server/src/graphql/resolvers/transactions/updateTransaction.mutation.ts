import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import prisma from "../../../config/db";
import { Transaction } from "../../../models/Transaction";
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
    @Arg("isIncome", { nullable: true }) isIncome?: boolean,
    @Arg("date", { nullable: true }) date?: string
  ) {
    if (!ctx.userId) {
      throw new Error("❌ Not authenticated");
    }
    const existingTransaction = await prisma.transactions.findUnique({
      where: { id },
    });

    if (!existingTransaction) {
      throw new Error("❌ Transaction not found");
    }
    if (existingTransaction.userId !== ctx.userId) {
      throw new Error("❌ You do not have permission to edit this transaction");
    }
    const formattedDate = date
      ? new Date(date).toISOString()
      : existingTransaction.date.toISOString();
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
