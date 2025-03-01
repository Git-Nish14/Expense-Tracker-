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

export const CREATE_EXPENSE = gql`
  mutation createExpense(
    $userId: String!
    $title: String!
    $amount: Float!
    $category: String!
    $type: String!
    $date: DateTimeISO!
  ) {
    createExpense(
      userId: $userId
      title: $title
      amount: $amount
      category: $category
      type: $type
      date: $date
    ) {
      id
      title
      amount
      category
      type
      date
    }
  }
`;

export const DELETE_EXPENSE = gql`
  mutation deleteExpense($id: String!) {
    deleteExpense(id: $id)
  }
`;

export const UPDATE_EXPENSE = gql`
  mutation updateExpense(
    $id: String!
    $title: String
    $amount: Float
    $category: String
    $type: String
    $date: DateTimeISO
  ) {
    updateExpense(
      id: $id
      title: $title
      amount: $amount
      category: $category
      type: $type
      date: $date
    ) {
      id
      title
      amount
      category
      type
      date
    }
  }
`;

export const CREATE_INCOME = gql`
  mutation createIncome(
    $userId: String!
    $title: String!
    $amount: Float!
    $category: String!
    $date: DateTimeISO!
  ) {
    createIncome(
      userId: $userId
      title: $title
      amount: $amount
      category: $category
      date: $date
    ) {
      id
      title
      amount
      category
      date
    }
  }
`;

export const DELETE_INCOME = gql`
  mutation deleteIncome($id: String!) {
    deleteIncome(id: $id)
  }
`;

export const UPDATE_INCOME = gql`
  mutation updateIncome(
    $id: String!
    $title: String
    $amount: Float
    $category: String
    $date: DateTimeISO
  ) {
    updateIncome(
      id: $id
      title: $title
      amount: $amount
      category: $category
      date: $date
    ) {
      id
      title
      amount
      category
      date
    }
  }
`;

export const DELETE_ALL_INCOME = gql`
  mutation deleteIncomes {
    deleteIncomes
  }
`;
