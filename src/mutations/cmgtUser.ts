import gql from "graphql-tag";

import { userFragment } from "../fragments/cmgtAuth";

export const cmgtAccountUpdate = gql`
  ${userFragment}
  mutation CmgtAccountUpdate($id: Int, $input: account_user_set_input) {
    update_account_user(where: { id: { _eq: $id } }, _set: $input) {
      affected_rows
      returning {
        ...CmgtUser
      }
    }
  }
`;
