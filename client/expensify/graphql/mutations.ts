import { gql } from "@apollo/client";

export const SIGNIN = gql`
  mutation signin($password: String!, $email: String!) {
    signin(password: $password, email: $email) {
      token
    }
  }
`;

export const SIGNUP = gql`
  mutation signup(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    signup(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
    }
  }
`;

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction(
    $title: String!
    $amount: Float!
    $category: String!
    $date: String!
    $isIncome: Boolean!
  ) {
    createTransaction(
      title: $title
      amount: $amount
      category: $category
      date: $date
      isIncome: $isIncome
    ) {
      id
      title
      amount
      category
      date
      isIncome
    }
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction(
    $id: String!
    $title: String
    $amount: Float
    $category: String
    $date: String
    $isIncome: Boolean
  ) {
    updateTransaction(
      id: $id
      title: $title
      amount: $amount
      category: $category
      date: $date
      isIncome: $isIncome
    ) {
      id
      title
      amount
      category
      date
      isIncome
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: String!) {
    deleteTransaction(id: $id)
  }
`;

export const DELETE_TRANSACTIONS = gql`
  mutation DeleteTransactions {
    deleteTransactions
  }
`;
