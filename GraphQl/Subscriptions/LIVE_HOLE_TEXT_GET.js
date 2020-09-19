import { gql } from "@apollo/client";

const liveHoleTextGet = gql`
  subscription liveHoleTextGet($course_id: String!) {
    liveHoleTextGet(course_id: $course_id) {
      holes {
        word
        index
        tip
        response
      }
    }
  }
`;

export default liveHoleTextGet;
