/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CmgtUserDetails
// ====================================================

export interface CmgtUserDetails_account_user_connection_edges_node_accountAddressByDefaultShippingAddressId {
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

export interface CmgtUserDetails_account_user_connection_edges_node_accountAddressByDefaultBillingAddressId {
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

export interface CmgtUserDetails_account_user_connection_edges_node_account_user_addresses_account_address {
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

export interface CmgtUserDetails_account_user_connection_edges_node_account_user_addresses {
  __typename: "account_user_addresses";
  /**
   * An object relationship
   */
  account_address: CmgtUserDetails_account_user_connection_edges_node_account_user_addresses_account_address;
}

export interface CmgtUserDetails_account_user_connection_edges_node {
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
  accountAddressByDefaultShippingAddressId: CmgtUserDetails_account_user_connection_edges_node_accountAddressByDefaultShippingAddressId | null;
  /**
   * An object relationship
   */
  accountAddressByDefaultBillingAddressId: CmgtUserDetails_account_user_connection_edges_node_accountAddressByDefaultBillingAddressId | null;
  /**
   * An array relationship
   */
  account_user_addresses: CmgtUserDetails_account_user_connection_edges_node_account_user_addresses[];
}

export interface CmgtUserDetails_account_user_connection_edges {
  __typename: "account_userEdge";
  node: CmgtUserDetails_account_user_connection_edges_node;
}

export interface CmgtUserDetails_account_user_connection {
  __typename: "account_userConnection";
  edges: CmgtUserDetails_account_user_connection_edges[];
}

export interface CmgtUserDetails {
  /**
   * fetch data from the table: "account_user"
   */
  account_user_connection: CmgtUserDetails_account_user_connection;
}

export interface CmgtUserDetailsVariables {
  userId?: number | null;
}
