import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { Transaction } from "../../../models/Transaction"; // ✅ Import Transactions model
import prisma from "../../../config/db";
import { MyContext } from "../../../types/context";

@Resolver()
export class CreateTransactionResolver {
  @Mutation(() => Transaction)
  async createTransaction(
    @Arg("title") title: string,
    @Arg("amount") amount: number,
    @Arg("category") category: string,
    @Arg("date") date: string, // ✅ Keep date as string and convert
    @Arg("isIncome") isIncome: boolean, // ✅ Use isIncome to determine transaction type
    @Ctx() ctx: MyContext
  ) {
    if (!ctx.userId) {
      throw new Error("❌ Not authenticated");
    }

    // ✅ Check if the user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: ctx.userId },
    });

    if (!existingUser) {
      throw new Error("❌ User not found");
    }

    try {
      // ✅ Convert `date` to ISO format
      const formattedDate = new Date(date).toISOString();

      // ✅ Create transaction (income or expense)
      const transaction = await prisma.transactions.create({
        data: {
          title,
          amount,
          category,
          date: formattedDate,
          isIncome,
          user: { connect: { id: ctx.userId } }, // ✅ Associate with user
        },
        include: { user: true },
      });

      console.log("✅ Transaction created successfully:", transaction);
      return transaction;
    } catch (error) {
      console.error("❌ Error creating transaction:", error);
      throw new Error("Failed to create transaction");
    }
  }
}
