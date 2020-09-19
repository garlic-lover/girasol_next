import { gql } from "@apollo/client";

const signin = gql`
  mutation signin(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $dateOfBirth: String
    $myLanguage: String
    $learnedLanguage: String
    $courseName: String
    $isProf: Boolean
    $code: String
  ) {
    signin(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      dateOfBirth: $dateOfBirth
      learnedLanguage: $learnedLanguage
      myLanguage: $myLanguage
      courseName: $courseName
      isProf: $isProf
      code: $code
    ) {
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

export default signin;
