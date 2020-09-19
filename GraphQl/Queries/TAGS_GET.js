import { gql } from "@apollo/client";

const tagsGet = gql`
  query tagsGet($lang: String!) {
    tagsGet(lang: $lang) {
      name
      _id
    }
  }
`;

export default tagsGet;
