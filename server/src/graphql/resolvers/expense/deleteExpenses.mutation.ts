import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import prisma from "../../../config/db";

@Resolver()
export class DeleteExpensesResolver {
  @Mutation(() => String)
  async deleteExpenses() {
    if (await prisma.expense.deleteMany()) {
      return "Expenses deleted";
    }
    throw new Error("Unable to delete expenses");
  }
}
