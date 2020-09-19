import { gql } from "@apollo/client";

const liveMathGet = gql`
  subscription liveMathGet($course_id: String!) {
    liveMathGet(course_id: $course_id)
  }
`;

export default liveMathGet;
