/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CmgtUser
// ====================================================

export interface CmgtUser_accountAddressByDefaultShippingAddressId {
  __typename: "account_address";
  id: string;
  first_name: string;
  last_name: string;
  company_name: string;
  street_address_1: string;
  street_address_2: string;
  city: string;
  postal_code: string;
  country: string;
  country_area: string;
  phone: string;
}

export interface CmgtUser_accountAddressByDefaultBillingAddressId {
  __typename: "account_address";
  id: string;
  first_name: string;
  last_name: string;
  company_name: string;
  street_address_1: string;
  street_address_2: string;
  city: string;
  postal_code: string;
  country: string;
  country_area: string;
  phone: string;
}

export interface CmgtUser_account_user_addresses_account_address {
  __typename: "account_address";
  id: string;
  first_name: string;
  last_name: string;
  company_name: string;
  street_address_1: string;
  street_address_2: string;
  city: string;
  postal_code: string;
  country: string;
  country_area: string;
  phone: string;
}

export interface CmgtUser_account_user_addresses {
  __typename: "account_user_addresses";
  /**
   * An object relationship
   */
  account_address: CmgtUser_account_user_addresses_account_address;
}

export interface CmgtUser {
  __typename: "account_user";
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  default_shipping_address_id: number | null;
  default_billing_address_id: number | null;
  /**
   * An object relationship
   */
  accountAddressByDefaultShippingAddressId: CmgtUser_accountAddressByDefaultShippingAddressId | null;
  /**
   * An object relationship
   */
  accountAddressByDefaultBillingAddressId: CmgtUser_accountAddressByDefaultBillingAddressId | null;
  /**
   * An array relationship
   */
  account_user_addresses: CmgtUser_account_user_addresses[];
}
