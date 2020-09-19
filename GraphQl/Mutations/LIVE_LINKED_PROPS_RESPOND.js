import { gql } from "@apollo/client";

const liveLinkedPropsRespond = gql`
  mutation liveLinkedPropsRespond(
    $course_id: String!
    $theWordsLeft: [RandomedLinkedPropInput]
    $theWordsRight: [RandomedLinkedPropInput]
    $links: [LinkInput]
  ) {
    liveLinkedPropsRespond(
      course_id: $course_id
      theWordsLeft: $theWordsLeft
      theWordsRight: $theWordsRight
      links: $links
    )
  }
`;

export default liveLinkedPropsRespond;
