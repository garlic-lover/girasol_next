import { gql } from "@apollo/client";

const wordsGet = gql`
  query wordsGet($lang: String!, $tag: TagInput) {
    wordsGet(lang: $lang, tag: $tag) {
      type
      value
      gender
      firstLetter
      trads {
        en
        es
        fr
      }
      tags {
        _id
        name
      }
    }
  }
`;

export default wordsGet;
