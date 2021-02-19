/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddressInput, AccountErrorCode, CountryCode } from "./../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateUserAddress
// ====================================================

export interface CreateUserAddress_accountAddressCreate_errors {
  __typename: "AccountError";
  /**
   * The error code.
   */
  code: AccountErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface CreateUserAddress_accountAddressCreate_user_defaultShippingAddress_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code?: string;
  /**
   * Country name.
   */
  country: string;
}

export interface CreateUserAddress_accountAddressCreate_user_defaultShippingAddress {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  streetAddress1?: string;
  streetAddress2?: string;
  city?: string;
  postalCode?: string;
  /**
   * Shop's default country.
   */
  country?: CreateUserAddress_accountAddressCreate_user_defaultShippingAddress_country;
  countryArea?: string;
  phone?: string | null;
  /**
   * Address is user's default billing address.
   */
  isDefaultBillingAddress?: boolean | null;
  /**
   * Address is user's default shipping address.
   */
  isDefaultShippingAddress?: boolean | null;
}

export interface CreateUserAddress_accountAddressCreate_user_defaultBillingAddress_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code?: string;
  /**
   * Country name.
   */
  country: string;
}

export interface CreateUserAddress_accountAddressCreate_user_defaultBillingAddress {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  streetAddress1?: string;
  streetAddress2?: string;
  city?: string;
  postalCode?: string;
  /**
   * Shop's default country.
   */
  country?: CreateUserAddress_accountAddressCreate_user_defaultBillingAddress_country;
  countryArea?: string;
  phone?: string | null;
  /**
   * Address is user's default billing address.
   */
  isDefaultBillingAddress?: boolean | null;
  /**
   * Address is user's default shipping address.
   */
  isDefaultShippingAddress?: boolean | null;
}

export interface CreateUserAddress_accountAddressCreate_user_addresses_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code?: string;
  /**
   * Country name.
   */
  country?: string;
}

export interface CreateUserAddress_accountAddressCreate_user_addresses {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  streetAddress1?: string;
  streetAddress2?: string;
  city?: string;
  postalCode?: string;
  /**
   * Shop's default country.
   */
  country?: CreateUserAddress_accountAddressCreate_user_addresses_country;
  countryArea?: string;
  phone?: string | null;
  /**
   * Address is user's default billing address.
   */
  isDefaultBillingAddress?: boolean | null;
  /**
   * Address is user's default shipping address.
   */
  isDefaultShippingAddress?: boolean | null;
}

export interface CreateUserAddress_accountAddressCreate_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  isStaff?: boolean;
  defaultShippingAddress?: CreateUserAddress_accountAddressCreate_user_defaultShippingAddress | null;
  defaultBillingAddress?: CreateUserAddress_accountAddressCreate_user_defaultBillingAddress | null;
  /**
   * List of all user's addresses.
   */
  addresses?: (CreateUserAddress_accountAddressCreate_user_addresses | null)[] | null;
}

export interface CreateUserAddress_accountAddressCreate {
  __typename: "AccountAddressCreate";
  errors: CreateUserAddress_accountAddressCreate_errors[];
  /**
   * A user instance for which the address was created.
   */
  user: CreateUserAddress_accountAddressCreate_user | null;
}

export interface CreateUserAddressCheck {
  insert_account_address: CreateUserAddressCheckResult;
}

export interface CreateUserAddressCheckResult {
  affected_rows: number;
  returning: CreateUserAddressReturningValueCmgt[];
}

export interface CreateUserAddress {
  /**
   * Create a new address for the customer.
   */
  accountAddressCreate: CreateUserAddress_accountAddressCreate | null;
}

export interface CreateUserAddressVariables {
  input: AddressInput;
}

export interface CreateUserAddressVariablesCmgt {
  addressObject: CreateUserAddressVariablesCmgt_AddressInput;
}

export interface CreateUserAddressVariablesCmgt_AddressInput {
  firstName?: string | null;
  lastName?: string | null;
  companyName?: string | null;
  streetAddress1?: string | null;
  streetAddress2?: string | null;
  city?: string | null;
  cityArea?: string | null;
  postalCode?: string | null;
  country?: CountryCode | null;
  countryArea?: string | null;
  phone?: string | null;
  account_user_addresses: AddressInput_account_user_addresses;
}

export interface AddressInput_account_user_addresses {
  data: AddressInput_account_user_addresses_data;
}

export interface AddressInput_account_user_addresses_data {
  user_id: number;
}

export interface SelectUserAddressVariablesCmgt {
  user_id: number;
}

export interface SelectUserAddressCmgt {
  account_user_connection: SelectUserAddress_data_Cmgt;
}

export interface SelectUserAddressErrorCmgt {
  extensions: SelectUserAddressError_extensions_Cmgt | null;
  message: string | null;
}

export interface SelectUserAddressError_extensions_Cmgt {
  path: string | null;
  code: string | null;
}

export interface SelectUserAddress_data_Cmgt {
  edges:  SelectUserAddress_data_edges_Cmgt[];
}

export interface SelectUserAddress_data_edges_Cmgt {
  node:  SelectUserAddress_data_edges_node_value_Cmgt
}

export interface SelectUserAddress_data_edges_node_value_Cmgt {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  accountAddressByDefaultShippingAddressId: SelectUserAddress_data_edges_node_value_shipping_Cmgt;
  accountAddressByDefaultBillingAddressId: SelectUserAddress_data_edges_node_value_billing_Cmgt;
  account_user_addresses: SelectUserAddress_data_edges_node_value_userAddress_Cmgt[];
}

export interface SelectUserAddress_data_edges_node_value_shipping_Cmgt {
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
  phone: string | null;
}

export interface SelectUserAddress_data_edges_node_value_billing_Cmgt {
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
  phone: string | null;
}

export interface SelectUserAddress_data_edges_node_value_userAddress_Cmgt {
  account_address: SelectUserAddress_data_edges_node_value_userAddress_address_Cmgt;
}

export interface SelectUserAddress_data_edges_node_value_userAddress_address_Cmgt {
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
  phone: string | null;
}

export interface CreateUserAddressCmgt {
  affected_rows: number;
  returning: CreateUserAddressReturningValueCmgt[];
}

export interface CreateUserAddressReturningValueCmgt {
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
  phone: string | null;
}

