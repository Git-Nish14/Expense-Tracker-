import { gql } from "@apollo/client";

export const SIGNIN = gql`
  mutation SIGNIN($password: String!, $email: String!) {
    signin(password: $password, email: $email) {
      token
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup(
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
  mutation CREATE_EXPENSE(
    $userId: String!
    $start: DateTimeISO!
    $description: String!
    $title: String!
  ) {
    createExpense(
      userId: $userId
      start: $start
      description: $description
      title: $title
    ) {
      id
      title
      description
      start
    }
  }
`;
export const DELETE_EXPENSE = gql`
  mutation DELETE_EXPENSE($id: String!) {
    deleteExpense(id: $id)
  }
`;

export const UPDATE_EXPENSE = gql`
  mutation UPDATE_EXPENSE(
    $id: String!
    $title: String
    $description: String
    $start: DateTimeISO
    $end: DateTimeISO
  ) {
    updateExpense(
      id: $id
      description: $description
      title: $title
      start: $start
      end: $end
    ) {
      id
      title
      description
      start
      end
    }
  }
`;
