import { ICheckoutModel } from "../../helpers/LocalStorageHandler";

export interface CombinationLinesType {
  quantity: number;
  // variant_id: number;
  saleproduct_id: string;
  data: {};
}

export interface resultAddressType {
  id: string;
  first_name: string;
  last_name: string;
  country: string;
  phone: string;
  postal_code: string;
  street_address_1: string;
  street_address_2: string;
  country_area: string;
  company_name: string;
  city_area: string;
  city: string;
}

export interface resultCheckoutType {
  id: string;
  email: string;
  token: string;
  checkout_checkoutlines: resultCheckoutlinesType[];
}

export interface resultCheckoutlinesType {
  id: string;
  checkout_id: string;
  variant_id: number;
  saleproduct_id: string;
}

export interface resultShippingMethodsType {
  availableShippingMethods: (resultShippingMethodsValueType | null)[];
}

export interface resultShippingMethodsValueType {
  // __typename: "ShippingMethod",
  id: string;
  name: string;
  price: resultShippingMethodsPriceValueType;
}

export interface resultShippingMethodsPriceValueType {
  currency: string;
  amount: number;
}

export interface resultShippingShippingZoneType {
  shipping_shippingzone_connection: resultShippingShippingZone_edges_Type;
}

export interface resultShippingShippingZone_edges_Type {
  edges: resultShippingShippingZone_edges_node_Type[];
}

export interface resultShippingShippingZone_edges_node_Type {
  node: resultShippingShippingZone_edges_node_value_Type;
}

export interface resultShippingShippingZone_edges_node_value_Type {
  id: string;
  shipping_shippingmethods: resultShippingShippingZone_edges_node_ShippingMethod_value_Type[];
}

export interface resultShippingShippingZone_edges_node_ShippingMethod_value_Type {
  id: string;
  name: string;
  currency: string;
  price_amount: number;
  type: string;
}

export interface addressValueType {
  id?: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  street_address_1?: string;
  street_address_2?: string;
  city?: string;
  postal_code?: string;
  country_area?: string;
  phone?: string | null;
  country?: string;
}

export interface SelectShippingMethodValue {
  id: string;
  name: string;
  price: SelectShippingMethodPriceValue | null;
}

export interface SelectShippingMethodPriceValue {
  currency: string;
  amount: number;
}

export interface SelectPromoValue {
  code: string;
  name: string;
  discount_value_type: string;
  discount_value: number;
  currency: string;
  usage_limit: number;
  used: number;
  min_checkout_items_quantity: number;
  min_spent_amount: number;
}
export interface CreatePaymentObjectInput {
  amount: number;
  checkout: ICheckoutModel | null;
  gateway: string;
  token?: string;
  returnUrl?: string;
}

export interface paymentValue {
  gateway: string;
  id: string;
  token: string;
  total: totalValue;
}

export interface orderValue {
  id: string;
  token: string;
}

export interface totalValue {
  amount: number;
  currency: string;
}

export interface cardValue {
  cardNo: string;
  brand: string;
  cvc: number;
  year: number;
  month: number;
}

export interface paymentListWithCheckout {
  edges: paymentListWithCheckout_edges[];
}

export interface paymentListWithCheckout_edges {
  node: paymentListWithCheckout_edges_node;
}

export interface paymentListWithCheckout_edges_node {
  id: string;
}
