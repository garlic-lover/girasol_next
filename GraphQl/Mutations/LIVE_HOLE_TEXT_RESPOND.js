import { gql } from "@apollo/client";

const liveHoleTextRespond = gql`
  mutation liveHoleTextRespond($course_id: String!, $holes: [HoleInput]) {
    liveHoleTextRespond(course_id: $course_id, holes: $holes)
  }
`;

export default liveHoleTextRespond;
