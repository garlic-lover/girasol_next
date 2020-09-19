import { gql } from "@apollo/client";

const studentDelete = gql`
  mutation studentDelete($_id: String) {
    studentDelete(_id: $_id)
  }
`;

export default studentDelete;
