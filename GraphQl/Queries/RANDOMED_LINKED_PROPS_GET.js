import { gql } from "@apollo/client";

const randomedLinkedPropsGet = gql`
  query randomedLinkedPropsGet($course_id: String!) {
    randomedLinkedPropsGet(course_id: $course_id) {
      title
      description
      theWordsLeft {
        value
        position
        try
        match
      }
      theWordsRight {
        value
        position
        try
        match
      }
      links {
        left {
          value
          position
          try
          match
        }
        leftIndex
        right {
          value
          position
          try
          match
        }
        rightIndex
      }
    }
  }
`;

export default randomedLinkedPropsGet;
