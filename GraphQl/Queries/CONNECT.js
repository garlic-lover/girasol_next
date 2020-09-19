import { gql } from "@apollo/client";

const connect = gql`
  query connect {
    connect {
      connectedStatus
      firstName
      lastName
      myLanguage
      learnedLanguage
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
`;

export default connect;
