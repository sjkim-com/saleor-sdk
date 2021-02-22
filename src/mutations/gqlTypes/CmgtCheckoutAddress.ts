
export interface Update_address_address_variables {
  addressId: number;
  addressObject: Set_address_address_variables_addressObject;
}

export interface Set_address_address_variables_addressObject {
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

export interface CreateCheckout_checkout_checkout_variables {
  checkoutObject: CreateCheckout_checkout_checkout_variables_checkoutObject;
}

export interface CreateCheckout_checkout_checkout_variables_checkoutObject {
  email: string,
  metadata: any,
  billing_address_id: number | null, 
  private_metadata: string,
  quantity: number,
  country?: string,
  shipping_address_id: number | null,
  token: string,
  currency: string,
  note: string,
  discount_amount: number,
  shipping_method_id: number | null,
  discount_name: string | null,
  redirect_url: string | null,
  translated_discount_name: string | null,
  checkout_checkoutlines: {
    data: CreateCheckout_checkout_checkout_variables_checkoutObject_checkoutlines[],
  },
  voucher_code: string | null,
  tracking_code: string | null
}

export interface CreateCheckout_checkout_checkout_variables_checkoutObject_checkoutlines {
  quantity: number;
  // variant_id: number;
  saleproduct_id: string;
  data: {};
}

export interface Create_address_address_variables {
  addressObject: Set_address_address_variables_addressObject;
}