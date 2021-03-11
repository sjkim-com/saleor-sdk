/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CmgtCheckoutProductVariants
// ====================================================

export interface CmgtCheckoutProductVariants_pms_saleproduct_connection_edges_node_pms_saleproductoptionvalues_pms_productoptionvalue_pms_productoption {
  __typename: "pms_productoption";
  id: string;
  /**
   * オプション名
   */
  option_name: string | null;
}

export interface CmgtCheckoutProductVariants_pms_saleproduct_connection_edges_node_pms_saleproductoptionvalues_pms_productoptionvalue {
  __typename: "pms_productoptionvalue";
  id: string;
  attribute_value: string | null;
  option_value: string | null;
  /**
   * An object relationship
   */
  pms_productoption: CmgtCheckoutProductVariants_pms_saleproduct_connection_edges_node_pms_saleproductoptionvalues_pms_productoptionvalue_pms_productoption | null;
}

export interface CmgtCheckoutProductVariants_pms_saleproduct_connection_edges_node_pms_saleproductoptionvalues {
  __typename: "pms_saleproductoptionvalue";
  /**
   * An object relationship
   */
  pms_productoptionvalue: CmgtCheckoutProductVariants_pms_saleproduct_connection_edges_node_pms_saleproductoptionvalues_pms_productoptionvalue | null;
}

export interface CmgtCheckoutProductVariants_pms_saleproduct_connection_edges_node_pms_warehousestocks {
  __typename: "pms_warehousestock";
  warehouse_id: string;
  safe_stock_qty: number;
  stock_qty: number;
}

export interface CmgtCheckoutProductVariants_pms_saleproduct_connection_edges_node_pms_product_pms_productimgs {
  __typename: "pms_productimg";
  id: string;
  /**
   * 画像||商品ID_画像番号
   */
  img: string | null;
  /**
   * 画像番号
   */
  img_no: number;
  /**
   * 商品画像タイプコード
   */
  productimg_type_cd: string | null;
  /**
   * ソート順
   */
  sort_no: any | null;
  /**
   * 代替テキスト
   */
  text: string | null;
  /**
   * 使用可否
   */
  use_yn: string | null;
}

export interface CmgtCheckoutProductVariants_pms_saleproduct_connection_edges_node_pms_product {
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
   * An array relationship
   */
  pms_productimgs: CmgtCheckoutProductVariants_pms_saleproduct_connection_edges_node_pms_product_pms_productimgs[];
}

export interface CmgtCheckoutProductVariants_pms_saleproduct_connection_edges_node {
  __typename: "pms_saleproduct";
  id: string;
  /**
   * 상점ID
   */
  store_id: string | null;
  /**
   * 商品ID
   */
  product_id: string | null;
  /**
   * 単品ID
   */
  saleproduct_id: string;
  /**
   * 単品名
   */
  name: string | null;
  /**
   * 追加販売価格
   */
  add_sale_price: any | null;
  /**
   * An array relationship
   */
  pms_saleproductoptionvalues: CmgtCheckoutProductVariants_pms_saleproduct_connection_edges_node_pms_saleproductoptionvalues[];
  /**
   * An array relationship
   */
  pms_warehousestocks: CmgtCheckoutProductVariants_pms_saleproduct_connection_edges_node_pms_warehousestocks[];
  /**
   * An object relationship
   */
  pms_product: CmgtCheckoutProductVariants_pms_saleproduct_connection_edges_node_pms_product | null;
}

export interface CmgtCheckoutProductVariants_pms_saleproduct_connection_edges {
  __typename: "pms_saleproductEdge";
  node: CmgtCheckoutProductVariants_pms_saleproduct_connection_edges_node;
}

export interface CmgtCheckoutProductVariants_pms_saleproduct_connection {
  __typename: "pms_saleproductConnection";
  edges: CmgtCheckoutProductVariants_pms_saleproduct_connection_edges[];
}

export interface CmgtCheckoutProductVariants {
  /**
   * fetch data from the table: "pms_saleproduct"
   */
  pms_saleproduct_connection: CmgtCheckoutProductVariants_pms_saleproduct_connection;
}

export interface CmgtCheckoutProductVariantsVariables {
  ids?: string[] | null;
}
