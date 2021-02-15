/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * input type for updating data in table "account_user"
 */
 export interface account_user_set_input {
  avatar?: string | null;
  date_joined?: any | null;
  default_billing_address_id?: number | null;
  default_shipping_address_id?: number | null;
  email?: string | null;
  first_name?: string | null;
  id?: number | null;
  is_active?: boolean | null;
  is_staff?: boolean | null;
  is_superuser?: boolean | null;
  jwt_token_key?: string | null;
  last_login?: any | null;
  last_name?: string | null;
  metadata?: any | null;
  note?: string | null;
  password?: string | null;
  private_metadata?: any | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================


// ====================================================
// GraphQL mutation operation: CmgtAccountUpdate
// ====================================================

export interface CmgtAccountUpdate_update_account_user_returning_accountAddressByDefaultShippingAddressId {
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

export interface CmgtAccountUpdate_update_account_user_returning_accountAddressByDefaultBillingAddressId {
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

export interface CmgtAccountUpdate_update_account_user_returning_account_user_addresses_account_address {
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

export interface CmgtAccountUpdate_update_account_user_returning_account_user_addresses {
  __typename: "account_user_addresses";
  /**
   * An object relationship
   */
  account_address: CmgtAccountUpdate_update_account_user_returning_account_user_addresses_account_address;
}

export interface CmgtAccountUpdate_update_account_user_returning {
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
  accountAddressByDefaultShippingAddressId: CmgtAccountUpdate_update_account_user_returning_accountAddressByDefaultShippingAddressId | null;
  /**
   * An object relationship
   */
  accountAddressByDefaultBillingAddressId: CmgtAccountUpdate_update_account_user_returning_accountAddressByDefaultBillingAddressId | null;
  /**
   * An array relationship
   */
  account_user_addresses: CmgtAccountUpdate_update_account_user_returning_account_user_addresses[];
}

export interface CmgtAccountUpdate_update_account_user {
  __typename: "account_user_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
  /**
   * data of the affected rows by the mutation
   */
  returning: CmgtAccountUpdate_update_account_user_returning[];
}

export interface CmgtAccountUpdate {
  /**
   * update data of the table: "account_user"
   */
  update_account_user: CmgtAccountUpdate_update_account_user | null;
}

export interface CmgtAccountUpdateVariables {
  id?: number | null;
  input?: account_user_set_input | null;
}
