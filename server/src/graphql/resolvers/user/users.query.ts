import { Resolver, Query } from "type-graphql";
import prisma from "../../../config/db";
import { User } from "../../../models/User";

@Resolver()
export default class UsersResolver {
  @Query(() => [User])
  async users() {
    return prisma.user.findMany({
      include: {
        expenses: true, // Ensure related expenses are included
      },
    });
  }
}
