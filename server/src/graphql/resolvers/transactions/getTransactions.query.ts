import { Resolver, Query, Ctx, Arg, Int } from "type-graphql";
import prisma from "../../../config/db";
import { Transaction } from "../../../models/Transaction"; // ✅ Import the correct model
import { MyContext } from "../../../types/context";

@Resolver()
export class GetTransactionsResolver {
  @Query(() => [Transaction])
  async getTransactions(
    @Ctx() ctx: MyContext,
    @Arg("skip", () => Int, { defaultValue: 0 }) skip: number,
    @Arg("take", () => Int, { defaultValue: 10 }) take: number
  ) {
    if (!ctx.userId) {
      throw new Error("❌ Not authenticated");
    }

    return await prisma.transactions.findMany({
      where: { userId: ctx.userId },
      orderBy: { date: "desc" }, // ✅ Order transactions by most recent
      skip,
      take,
    });
  }
}
