import gql from "graphql-tag";

export const cmgtOrdersByUser = gql`
  query CmgtOrdersByUser($userId: Int!, $perPage: Int!, $after: String) {
    order_order_connection(
      where: { user_id: { _eq: $userId } }
      first: $perPage
      after: $after
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          user_id
          token
          status
          created
          total_gross_amount
          total_net_amount
          currency
          status
          order_orderlines {
            id
            product_name
            pms_saleproduct {
              id
              saleproduct_id
              name
              pms_product {
                id
                name
                product_id
              }
            }
            pms_productimg {
              id
              img
            }
          }
        }
      }
    }
  }
`;
