import "reflect-metadata";
import { buildSchema } from "type-graphql";
import SignupResolver from "./resolvers/user/signup.mutation";
import SigninResolver from "./resolvers/user/signin.mutation";
import UserResolver from "./resolvers/user/user.query";
import UsersResolver from "./resolvers/user/users.query";
import { CreateTransactionResolver } from "./resolvers/transactions/createTransaction.mutation";
import { UpdateTransactionResolver } from "./resolvers/transactions/updateTransaction.mutation";
import { DeleteTransactionResolver } from "./resolvers/transactions/deleteTransaction.mutation";
import { GetTransactionsResolver } from "./resolvers/transactions/getTransactions.query";
import { DeleteTransactionsResolver } from "./resolvers/transactions/deleteTransactions.mutation";
export const createSchema = async () => {
  return await buildSchema({
    resolvers: [
      SignupResolver,
      SigninResolver,
      UserResolver,
      UsersResolver,
      CreateTransactionResolver,
      UpdateTransactionResolver,
      DeleteTransactionResolver,
      DeleteTransactionsResolver,
      GetTransactionsResolver,
      GetTransactionsResolver,
    ],
  });
};
