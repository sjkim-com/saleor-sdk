import gql from "graphql-tag";

import { userFragment } from "../fragments/cmgtAuth";

export const cmgtGetUserDetailsQuery = gql`
  ${userFragment}
  query CmgtUserDetails($userId: Int) {
    account_user_connection(where: { id: { _eq: $userId } }) {
      edges {
        node {
          ...CmgtUser
        }
      }
    }
  }
`;
