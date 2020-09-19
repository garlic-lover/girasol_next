import { gql } from "@apollo/client";

const login = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      status
      token
      user {
        myLanguage
        learnedLanguage
        firstName
        lastName
        isProf
        courses {
          _id
          name
          studentName
          professorName
        }
        students {
          _id
          firstName
          lastName
        }
      }
    }
  }
`;

export default login;
