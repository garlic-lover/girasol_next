import { gql } from "@apollo/client";

const COURSE_GET = gql`
  query courseGet($_id: String!) {
    courseGet(_id: $_id) {
      name
      studentName
      professorName
      liveMath
      liveExercice {
        isOn
        mathLive
      }
    }
  }
`;

export default COURSE_GET;
