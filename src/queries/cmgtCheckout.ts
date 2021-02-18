import gql from "graphql-tag";

export const checkoutProductVariantsRelay = gql`
  query addCartList($variantId: Int) {
    product_productvariant_connection(where: { id: { _eq: $variantId } }) {
      edges {
        node {
          id
          name
          price_amount
          sku
          track_inventory
          currency
          product_product {
            id
            name
            product_producttype {
              id
              is_shipping_required
              product_attributevariants {
                product_attribute {
                  id
                  name
                  product_attributevalues {
                    id
                    name
                  }
                }
              }
            }
            product_productimages {
              id
              image
              alt
            }
          }
        }
      }
    }
  }
`;

// TODO: ADD Or, And
export const shippingMethodByCountry = gql`
  query ShippingMethodListByCountry(
    $productAmt: numeric
    $countryCode: String
    $weight: float8
    $currency: String
  ) {
    shipping_shippingzone_connection(
      where: { countries: { _like: $countryCode } }
    ) {
      edges {
        node {
          id
          shipping_shippingmethods {
            id
            name
            currency
            price_amount
            type
          }
        }
      }
    }
  }
`;

export const selecDiscountVoucher = gql`
  query selecDiscountVoucher($discountCode: String) {
    discount_voucher_connection(where: { code: { _eq: $discountCode } }) {
      edges {
        node {
          code
          name
          discount_value_type
          discount_value
          currency
          usage_limit
          used
          min_checkout_items_quantity
          min_spent_amount
        }
      }
    }
  }
`;

export const loginCheckoutList = gql`
  query loginCheckout($userId: Int) {
    checkout_checkout_connection(where: { user_id: { _eq: $userId } }) {
      edges {
        node {
          private_metadata
          metadata
          created
          last_change
          user_id
          email
          token
          quantity
          billing_address_id
          shipping_address_id
          shipping_method_id
          note
          currency
          country
          discount_amount
          discount_name
          translated_discount_name
          voucher_code
          redirect_url
          tracking_code
        }
      }
    }
  }
`;

export const selectPayemntIncludeCheckout = gql`
  query selectPayemntIncludeCheckout($checkoutId: uuid) {
    payment_payment_connection(where: { checkout_id: { _eq: $checkoutId } }) {
      edges {
        node {
          id
        }
      }
    }
  }
`;

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
            pms_productimgs(where: { saleproduct_id: { _in: $ids } }) {
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

export const cmgtSelectLastOrderNo = gql`
  query SelectLastOrderNo {
    order_order_connection(order_by: { id: asc_nulls_last }, last: 1) {
      edges {
        node {
          id
        }
      }
    }
  }
`;
