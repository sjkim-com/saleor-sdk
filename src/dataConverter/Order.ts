/* eslint-disable prettier/prettier */

import { CmgtOrdersByUser_order_order_connection } from "../queries/gqlTypes/CmgtOrdersByUser";

import {
  OrdersByUser_me_orders_pageInfo,
  OrdersByUser_me_orders_edges_node_total_gross,
  OrdersByUser_me_orders_edges_node_total_net,
  OrdersByUser_me_orders_edges_node_total,
  OrdersByUser_me_orders_edges_node_lines_variant_product,
  OrdersByUser_me_orders_edges_node_lines_variant,
  OrdersByUser_me_orders_edges_node_lines_thumbnail,
  OrdersByUser_me_orders_edges_node_lines_thumbnail2x,
  OrdersByUser_me_orders_edges_node_lines,
  OrdersByUser_me_orders_edges_node,
  OrdersByUser_me_orders_edges,
  OrdersByUser_me_orders,
  // OrdersByUser_me,
  // OrdersByUser,
  // OrdersByUserVariables,
} from "../queries/gqlTypes/OrdersByUser";

export const ordersByUserVariantsResponse = (
  CmgtOrderByUser: CmgtOrdersByUser_order_order_connection | null
) => {
  const pageIng = CmgtOrderByUser?.pageInfo;

  const OrdersByUserMeOrdersPageInfo: OrdersByUser_me_orders_pageInfo = {
    __typename: "PageInfo",
    hasNextPage: pageIng?.hasNextPage || false,
    endCursor: pageIng?.endCursor || "",
  };

  const edgesVariants = CmgtOrderByUser?.edges.map(edge => {
    const nodeData = edge.node;
    const productPriceGross = nodeData.total_gross_amount;
    const productPriceNet = nodeData.total_net_amount;
    const currencyCode = nodeData.currency;

    const OrdersByUserMeOrdersEdgesNodeTotalGross: OrdersByUser_me_orders_edges_node_total_gross = {
      __typename: "Money",
      amount: productPriceGross,
      currency: currencyCode,
    };

    const OrdersByUserMeOrdersEdgesNodeTotalNet: OrdersByUser_me_orders_edges_node_total_net = {
      __typename: "Money",
      amount: productPriceNet,
      currency: currencyCode,
    };

    const OrdersByUserMeOrdersEdgesNodeTotal: OrdersByUser_me_orders_edges_node_total = {
      __typename: "TaxedMoney",
      gross: OrdersByUserMeOrdersEdgesNodeTotalGross,
      net: OrdersByUserMeOrdersEdgesNodeTotalNet,
    };

    const lineVariants = nodeData.order_orderlines.map(line => {
      const OrdersByUserMeOrdersEdgesNodeLinesVariantProduct: OrdersByUser_me_orders_edges_node_lines_variant_product = {
        __typename: "Product",
        name: line.pms_saleproduct?.pms_product?.name || "",
        id: line.pms_saleproduct?.pms_product?.id || "",
      };

      const OrdersByUserMeOrdersEdgesNodeLinesVariant: OrdersByUser_me_orders_edges_node_lines_variant = {
        __typename: "ProductVariant",
        id: line.id,
        product: OrdersByUserMeOrdersEdgesNodeLinesVariantProduct,
      };

      const imgUrl = line.pms_productimg?.img || "";

      const OrdersByUserMeOrdersEdgesNodeLinesThumbnail: OrdersByUser_me_orders_edges_node_lines_thumbnail = {
        __typename: "Image",
        alt: "",
        url: imgUrl,
      };

      const OrdersByUserMeOrdersEdgesNodeLinesThumbnail2x: OrdersByUser_me_orders_edges_node_lines_thumbnail2x = {
        __typename: "Image",
        url: imgUrl,
      };

      const OrdersByUserMeOrdersEdgesNodeLines: OrdersByUser_me_orders_edges_node_lines = {
        __typename: "OrderLine",
        id: line.id,
        variant: OrdersByUserMeOrdersEdgesNodeLinesVariant,
        thumbnail: OrdersByUserMeOrdersEdgesNodeLinesThumbnail,
        thumbnail2x: OrdersByUserMeOrdersEdgesNodeLinesThumbnail2x,
      };

      return OrdersByUserMeOrdersEdgesNodeLines;
    });

    const OrdersByUserMeOrdersEdgesNode: OrdersByUser_me_orders_edges_node = {
      __typename: "Order",
      id: nodeData.id,
      token: nodeData.token,
      number: nodeData.id,
      statusDisplay: nodeData.status,
      created: nodeData.created,
      total: OrdersByUserMeOrdersEdgesNodeTotal,
      lines: lineVariants,
    };

    const OrdersByUserMeOrdersEdges: OrdersByUser_me_orders_edges = {
      __typename: "OrderCountableEdge",
      node: OrdersByUserMeOrdersEdgesNode,
    };

    return OrdersByUserMeOrdersEdges;
  });

  const OrdersByUserMeOrders: OrdersByUser_me_orders = {
    __typename: "OrderCountableConnection",
    pageInfo: OrdersByUserMeOrdersPageInfo,
    edges: edgesVariants || [],
  };

  return OrdersByUserMeOrders;
};
