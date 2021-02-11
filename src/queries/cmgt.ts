import gql from "graphql-tag";

export const cmgtCheckoutProductVariants = gql`
  query CmgtCheckoutProductVariants($ids: [String!]) {
    pms_saleproduct_connection(where: { saleproduct_id: { _in: $ids } }) {
      edges {
        node {
          id
          store_id
          product_id
          saleproduct_id
          name
          add_sale_price
          pms_saleproductoptionvalues {
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
          pms_warehousestocks {
            warehouse_id
            safe_stock_qty
            stock_qty
          }
          pms_product {
            id
            name
            sale_price
            pms_productimgs {
              id
              img
              img_no
              productimg_type_cd
              sort_no
              text
              use_yn
            }
          }
        }
      }
    }
  }
`;
