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
