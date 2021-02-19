/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CmgtUserOrderByToken
// ====================================================

export interface CmgtUserOrderByToken_order_order_connection_edges_node_payment_payments {
  __typename: "payment_payment";
  id: string;
  charge_status: string;
}

export interface CmgtUserOrderByToken_order_order_connection_edges_node_accountAddressByShippingAddressId {
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

export interface CmgtUserOrderByToken_order_order_connection_edges_node_order_orderlines_pms_saleproduct_pms_product {
  __typename: "pms_product";
  id: string;
  /**
   * 商品名
   */
  name: string | null;
  /**
   * 商品番号
   */
  product_id: string;
  /**
   * 販売価
   */
  sale_price: any | null;
  /**
   * 課稅分類コード
   */
  tax_type_cd: string | null;
  /**
   * 부가가치세율
   */
  vat_rate: any | null;
}

export interface CmgtUserOrderByToken_order_order_connection_edges_node_order_orderlines_pms_saleproduct_pms_saleproductoptionvalues_pms_productoptionvalue_pms_productoption {
  __typename: "pms_productoption";
  id: string;
  /**
   * オプション名
   */
  option_name: string | null;
}

export interface CmgtUserOrderByToken_order_order_connection_edges_node_order_orderlines_pms_saleproduct_pms_saleproductoptionvalues_pms_productoptionvalue {
  __typename: "pms_productoptionvalue";
  id: string;
  attribute_value: string | null;
  option_value: string | null;
  /**
   * An object relationship
   */
  pms_productoption: CmgtUserOrderByToken_order_order_connection_edges_node_order_orderlines_pms_saleproduct_pms_saleproductoptionvalues_pms_productoptionvalue_pms_productoption | null;
}

export interface CmgtUserOrderByToken_order_order_connection_edges_node_order_orderlines_pms_saleproduct_pms_saleproductoptionvalues {
  __typename: "pms_saleproductoptionvalue";
  id: string;
  /**
   * An object relationship
   */
  pms_productoptionvalue: CmgtUserOrderByToken_order_order_connection_edges_node_order_orderlines_pms_saleproduct_pms_saleproductoptionvalues_pms_productoptionvalue | null;
}

export interface CmgtUserOrderByToken_order_order_connection_edges_node_order_orderlines_pms_saleproduct_pms_productimgs {
  __typename: "pms_productimg";
  id: string;
  /**
   * 画像||商品ID_画像番号
   */
  img: string | null;
  /**
   * ソート順
   */
  sort_no: any | null;
}

export interface CmgtUserOrderByToken_order_order_connection_edges_node_order_orderlines_pms_saleproduct {
  __typename: "pms_saleproduct";
  id: string;
  /**
   * 単品名
   */
  name: string | null;
  /**
   * 単品ID
   */
  saleproduct_id: string;
  /**
   * 追加販売価格
   */
  add_sale_price: any | null;
  /**
   * An object relationship
   */
  pms_product: CmgtUserOrderByToken_order_order_connection_edges_node_order_orderlines_pms_saleproduct_pms_product | null;
  /**
   * An array relationship
   */
  pms_saleproductoptionvalues: CmgtUserOrderByToken_order_order_connection_edges_node_order_orderlines_pms_saleproduct_pms_saleproductoptionvalues[];
  /**
   * An array relationship
   */
  pms_productimgs: CmgtUserOrderByToken_order_order_connection_edges_node_order_orderlines_pms_saleproduct_pms_productimgs[];
}

export interface CmgtUserOrderByToken_order_order_connection_edges_node_order_orderlines {
  __typename: "order_orderline";
  id: string;
  product_name: string;
  quantity: number;
  /**
   * An object relationship
   */
  pms_saleproduct: CmgtUserOrderByToken_order_order_connection_edges_node_order_orderlines_pms_saleproduct | null;
  unit_price_net_amount: any;
  unit_price_gross_amount: any;
  currency: string;
}

export interface CmgtUserOrderByToken_order_order_connection_edges_node_invoice_invoices {
  __typename: "invoice_invoice";
  id: string;
  number: string | null;
  created_at: any;
  external_url: string | null;
  status: string;
}

export interface CmgtUserOrderByToken_order_order_connection_edges_node {
  __typename: "order_order";
  id: string;
  user_email: string;
  status: string;
  token: string;
  /**
   * An array relationship
   */
  payment_payments: CmgtUserOrderByToken_order_order_connection_edges_node_payment_payments[];
  /**
   * An object relationship
   */
  accountAddressByShippingAddressId: CmgtUserOrderByToken_order_order_connection_edges_node_accountAddressByShippingAddressId | null;
  /**
   * An array relationship
   */
  order_orderlines: CmgtUserOrderByToken_order_order_connection_edges_node_order_orderlines[];
  total_net_amount: any;
  total_gross_amount: any;
  shipping_price_net_amount: any;
  shipping_price_gross_amount: any;
  currency: string;
  /**
   * An array relationship
   */
  invoice_invoices: CmgtUserOrderByToken_order_order_connection_edges_node_invoice_invoices[];
}

export interface CmgtUserOrderByToken_order_order_connection_edges {
  __typename: "order_orderEdge";
  node: CmgtUserOrderByToken_order_order_connection_edges_node;
}

export interface CmgtUserOrderByToken_order_order_connection {
  __typename: "order_orderConnection";
  edges: CmgtUserOrderByToken_order_order_connection_edges[];
}

export interface CmgtUserOrderByToken {
  /**
   * fetch data from the table: "order_order"
   */
  order_order_connection: CmgtUserOrderByToken_order_order_connection;
}

export interface CmgtUserOrderByTokenVariables {
  token: string;
}
