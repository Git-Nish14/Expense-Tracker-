import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser {
    user {
      id
      firstName
      lastName
      email
      budget
      income
      expenses {
        id
        title
        amount
        category
        type
        date
      }
    }
  }
`;

export const GET_EXPENSES = gql`
  query GetExpenses {
    getExpenses {
      id
      title
      amount
      date
      category
    }
  }
`;

export const GET_INCOMES = gql`
  query GetIncomes {
    getIncomes {
      id
      title
      amount
      date
      category
    }
  }
`;

export const GET_USER_WITH_INCOME = gql`
  query getUser {
    user {
      id
      firstName
      lastName
      email
      budget
      income
      expenses {
        id
        title
        amount
        category
        type
        date
      }
      incomes {
        id
        title
        amount
        category
        date
      }
    }
  }
`;

export const GET_RECENT_TRANSACTIONS = gql`
  query GetRecentTransactions {
    transactions {
      id
      date
      title
      category
      amount
      type
    }
  }
`;
