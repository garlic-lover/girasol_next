import { gql } from "@apollo/client";

const exercicesGet = gql`
  query exercicesGet {
    exercicesGet {
      _id
      title
      type
    }
  }
`;

export default exercicesGet;
