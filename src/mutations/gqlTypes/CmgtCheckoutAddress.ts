
export interface Update_address_address_variables {
  addressId: number;
  addressObject: Update_address_address_variables_addressObject;
}

export interface Update_address_address_variables_addressObject {
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

export interface Update_checkout_checkout_variables_email {
  token: string;
  email: string;
}