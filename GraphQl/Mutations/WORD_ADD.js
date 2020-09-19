import { gql } from "@apollo/client";

const wordAdd = gql`
  mutation wordAdd($word: WordInput) {
    wordAdd(word: $word)
  }
`;

export default wordAdd;
