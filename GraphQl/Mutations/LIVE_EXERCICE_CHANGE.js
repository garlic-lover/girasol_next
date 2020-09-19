import { gql } from "@apollo/client";

const liveExerciceChange = gql`
  mutation liveExerciceChange(
    $course_id: String!
    $ex_id: String
    $isOn: Boolean
    $type: String
    $mathLive: Boolean
  ) {
    liveExerciceChange(
      course_id: $course_id
      ex_id: $ex_id
      isOn: $isOn
      type: $type
      mathLive: $mathLive
    )
  }
`;

export default liveExerciceChange;
