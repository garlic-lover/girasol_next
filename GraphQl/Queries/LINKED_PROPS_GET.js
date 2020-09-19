import { gql } from "@apollo/client";

const linkedPropsGet = gql`
  query linkedPropsGet($ex_id: String!) {
    linkedPropsGet(ex_id: $ex_id) {
      title
      description
      words {
        proposition
        solution
      }
    }
  }
`;

export default linkedPropsGet;
