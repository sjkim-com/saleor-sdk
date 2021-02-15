import gql from "graphql-tag";

export const accountAddressFragment = gql`
  fragment CmgtAccountAddress on account_address {
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
`;

export const userFragment = gql`
  ${accountAddressFragment}
  fragment CmgtUser on account_user {
    id
    email
    first_name
    last_name
    is_staff
    default_shipping_address_id
    default_billing_address_id
    accountAddressByDefaultShippingAddressId {
      ...CmgtAccountAddress
    }
    accountAddressByDefaultBillingAddressId {
      ...CmgtAccountAddress
    }
    account_user_addresses {
      account_address {
        ...CmgtAccountAddress
      }
    }
  }
`;
