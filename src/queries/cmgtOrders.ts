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
                sale_price
                tax_type_cd
                vat_rate
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

export const cmgtOrderDetailsByTokenQuery = gql`
  query CmgtOrderByToken($token: String!) {
    order_order_connection(where: { token: { _eq: $token } }) {
      edges {
        node {
          id
          user_email
          status
          token
          payment_payments {
            id
            charge_status
          }
          accountAddressByShippingAddressId {
            id
            first_name
            last_name
            company_name
            street_address_1
            street_address_2
            city
            postal_code
            country
            country_area
            phone
          }
          order_orderlines {
            id
            product_name
            quantity
            pms_saleproduct {
              id
              name
              saleproduct_id
              add_sale_price
              pms_product {
                id
                name
                product_id
                sale_price
                tax_type_cd
                vat_rate
              }
              pms_saleproductoptionvalues {
                id
                pms_productoptionvalue {
                  id
                  attribute_value
                  option_value
                  pms_productoption {
                    id
                    option_name
                  }
                }
              }
            }
            pms_productimg {
              id
              img
            }
            unit_price_net_amount
            unit_price_gross_amount
            currency
          }
          total_net_amount
          total_gross_amount
          shipping_price_net_amount
          shipping_price_gross_amount
          currency
        }
      }
    }
  }
`;

export const cmgtUserOrderDetailsByTokenQuery = gql`
  query CmgtUserOrderByToken($token: String!) {
    order_order_connection(where: { token: { _eq: $token } }) {
      edges {
        node {
          id
          user_email
          status
          token
          payment_payments {
            id
            charge_status
          }
          accountAddressByShippingAddressId {
            id
            first_name
            last_name
            company_name
            street_address_1
            street_address_2
            city
            postal_code
            country
            country_area
            phone
          }
          order_orderlines {
            id
            product_name
            quantity
            pms_saleproduct {
              id
              name
              saleproduct_id
              add_sale_price
              pms_product {
                id
                name
                product_id
                sale_price
                tax_type_cd
                vat_rate
              }
              pms_saleproductoptionvalues {
                id
                pms_productoptionvalue {
                  id
                  attribute_value
                  option_value
                  pms_productoption {
                    id
                    option_name
                  }
                }
              }
            }
            pms_productimg {
              id
              img
            }
            unit_price_net_amount
            unit_price_gross_amount
            currency
          }
          total_net_amount
          total_gross_amount
          shipping_price_net_amount
          shipping_price_gross_amount
          currency
          invoice_invoices {
            id
            number
            created_at
            external_url
            status
          }
        }
      }
    }
  }
`;
