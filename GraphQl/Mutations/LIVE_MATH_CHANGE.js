import { gql } from "@apollo/client";

const liveMathChange = gql`
  mutation liveMathChange($course_id: String, $string: String) {
    liveMathChange(course_id: $course_id, string: $string)
  }
`;

export default liveMathChange;
