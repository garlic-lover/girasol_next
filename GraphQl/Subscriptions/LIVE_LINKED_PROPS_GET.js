import { gql } from "@apollo/client";

const liveLinkedPropsGet = gql`
  subscription liveLinkedPropsGet($course_id: String!) {
    liveLinkedPropsGet(course_id: $course_id) {
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

export default liveLinkedPropsGet;
