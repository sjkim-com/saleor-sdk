import { CountryCode } from "../../gqlTypes/globalTypes";

export interface UpdateUserAddressCmgt {
  update_account_address: updateUserAddress_update_account_address;
}

export interface updateUserAddress_update_account_address {
  affected_rows?: number;
  returning?: updateUserAddress_update_account_address_returning[];
}

export interface updateUserAddress_update_account_address_returning {
  id?: string;
  first_name?: string;
  last_name?: string;
  country?: string;
  phone?: string | null;
  postal_code?: string;
  street_address_1?: string;
  street_address_2?: string;
  country_area?: string;
  company_name?: string;
  city_area?: string;
  city?: string;
}

export interface updateUserAddressCmgtVariables {
  addressId?: number;
  addressObject: updateUserAddressCmgtVariables_addressObject;
}

export interface updateUserAddressCmgtVariables_addressObject {
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
}