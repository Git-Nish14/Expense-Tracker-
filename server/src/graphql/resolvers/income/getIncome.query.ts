import { Resolver, Query, Ctx, Arg, Int } from "type-graphql";
import prisma from "../../../config/db";
import { Income } from "../../../models/Income";
import { MyContext } from "../../../types/context";

@Resolver()
export class GetIncomesResolver {
  @Query(() => [Income])
  async getIncomes(
    @Ctx() ctx: MyContext,
    @Arg("skip", () => Int, { defaultValue: 0 }) skip: number,
    @Arg("take", () => Int, { defaultValue: 10 }) take: number
  ) {
    if (!ctx.userId) {
      throw new Error("Not authenticated");
    }

    return await prisma.income.findMany({
      where: { userId: ctx.userId },
      orderBy: { date: "desc" },
      skip,
      take,
    });
  }
}
