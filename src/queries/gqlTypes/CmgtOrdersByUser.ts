/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CmgtOrdersByUser
// ====================================================

export interface CmgtOrdersByUser_order_order_connection_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  endCursor: string;
}

export interface CmgtOrdersByUser_order_order_connection_edges_node_order_orderlines_pms_saleproduct_pms_product {
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
}

export interface CmgtOrdersByUser_order_order_connection_edges_node_order_orderlines_pms_saleproduct {
  __typename: "pms_saleproduct";
  id: string;
  /**
   * 単品ID
   */
  saleproduct_id: string;
  /**
   * 単品名
   */
  name: string | null;
  /**
   * An object relationship
   */
  pms_product: CmgtOrdersByUser_order_order_connection_edges_node_order_orderlines_pms_saleproduct_pms_product | null;
}

export interface CmgtOrdersByUser_order_order_connection_edges_node_order_orderlines_pms_productimg {
  __typename: "pms_productimg";
  id: string;
  /**
   * 画像||商品ID_画像番号
   */
  img: string | null;
}

export interface CmgtOrdersByUser_order_order_connection_edges_node_order_orderlines {
  __typename: "order_orderline";
  id: string;
  product_name: string;
  /**
   * An object relationship
   */
  pms_saleproduct: CmgtOrdersByUser_order_order_connection_edges_node_order_orderlines_pms_saleproduct | null;
  /**
   * An object relationship
   */
  pms_productimg: CmgtOrdersByUser_order_order_connection_edges_node_order_orderlines_pms_productimg | null;
}

export interface CmgtOrdersByUser_order_order_connection_edges_node {
  __typename: "order_order";
  id: string;
  user_id: number | null;
  token: string;
  status: string;
  created: any;
  total_gross_amount: any;
  total_net_amount: any;
  currency: string;
  /**
   * An array relationship
   */
  order_orderlines: CmgtOrdersByUser_order_order_connection_edges_node_order_orderlines[];
}

export interface CmgtOrdersByUser_order_order_connection_edges {
  __typename: "order_orderEdge";
  node: CmgtOrdersByUser_order_order_connection_edges_node;
}

export interface CmgtOrdersByUser_order_order_connection {
  __typename: "order_orderConnection";
  pageInfo: CmgtOrdersByUser_order_order_connection_pageInfo;
  edges: CmgtOrdersByUser_order_order_connection_edges[];
}

export interface CmgtOrdersByUser {
  /**
   * fetch data from the table: "order_order"
   */
  order_order_connection: CmgtOrdersByUser_order_order_connection;
}

export interface CmgtOrdersByUserVariables {
  userId: number;
  perPage: number;
  after?: string | null;
}
