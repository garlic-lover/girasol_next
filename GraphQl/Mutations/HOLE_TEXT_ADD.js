import { gql } from "@apollo/client";

const holeTextAdd = gql`
  mutation holeTextAdd(
    $title: String
    $description: String
    $parsedText: [[String]]
    $holes: [HoleInput]
  ) {
    holeTextAdd(
      title: $title
      description: $description
      parsedText: $parsedText
      holes: $holes
    )
  }
`;

export default holeTextAdd;
