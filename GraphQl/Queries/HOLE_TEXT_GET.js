import { gql } from "@apollo/client";

const holeTextGet = gql`
  query holeTextGet($ex_id: String!) {
    holeTextGet(ex_id: $ex_id) {
      title
      description
      parsedText
      holes {
        word
        index
        tip
        response
      }
    }
  }
`;

export default holeTextGet;
