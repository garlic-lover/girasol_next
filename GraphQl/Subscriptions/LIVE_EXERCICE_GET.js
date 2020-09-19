import { gql } from "@apollo/client";

const liveExerciceGet = gql`
  subscription liveExerciceGet($course_id: String!) {
    liveExerciceGet(course_id: $course_id) {
      ex_id
      isOn
      type
      mathLive
    }
  }
`;

export default liveExerciceGet;
