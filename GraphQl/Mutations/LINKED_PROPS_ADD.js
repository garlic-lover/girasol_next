import { gql } from "@apollo/client";

const linkedPropsAdd = gql`
  mutation linkedPropsAdd(
    $title: String
    $description: String
    $words: [LinkedPropInput]
  ) {
    linkedPropsAdd(title: $title, description: $description, words: $words)
  }
`;

export default linkedPropsAdd;
