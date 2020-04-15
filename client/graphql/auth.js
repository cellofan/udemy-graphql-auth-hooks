import { gql } from '@apollo/client';

const GET_USER = gql`
  {
    user {
      id
      email
    }
  }
`;

const LOGOUT = gql`
  mutation {
    logout{
      id
      email
    }
  }
`;

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;

const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      id
      email
    }
  }
`;

export {
  GET_USER, LOGOUT, LOGIN, SIGNUP
};
