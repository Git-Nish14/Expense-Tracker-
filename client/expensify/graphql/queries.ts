import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser {
    user {
      id
      firstName
      lastName
      email
    }
  }
`;

export const GET_TRANSACTIONS = gql`
  query GetTransactions($skip: Int, $take: Int) {
    getTransactions(skip: $skip, take: $take) {
      id
      title
      amount
      category
      date
      isIncome
    }
  }
`;
