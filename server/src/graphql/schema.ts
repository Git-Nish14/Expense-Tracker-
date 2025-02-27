import "reflect-metadata";
import { buildSchema } from "type-graphql";
import SignupResolver from "./resolvers/user/signup.mutation";
import SigninResolver from "./resolvers/user/signin.mutation";
import UserResolver from "./resolvers/user/user.query";
import UsersResolver from "./resolvers/user/users.query";
import { CreateExpenseResolver } from "./resolvers/expense/createExpense.mutation";
import { UpdateExpenseResolver } from "./resolvers/expense/updateExpense.mutation";
import { DeleteExpenseResolver } from "./resolvers/expense/deleteExpense.mutation";
import { GetExpensesResolver } from "./resolvers/expense/getExpenses.query";
import { DeleteExpensesResolver } from "./resolvers/expense/deleteExpenses.mutation";

export const createSchema = async () => {
  return await buildSchema({
    resolvers: [
      SignupResolver,
      SigninResolver,
      UserResolver,
      UsersResolver,
      CreateExpenseResolver,
      UpdateExpenseResolver,
      DeleteExpenseResolver,
      DeleteExpensesResolver,
      GetExpensesResolver,
    ],
  });
};
