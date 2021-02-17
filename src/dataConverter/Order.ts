/* eslint-disable prettier/prettier */

// ordersByUserVariantsResponse
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
} from "../queries/gqlTypes/OrdersByUser";

// orderDetailsByTokenVariantsResponse
import { CmgtUserOrderByToken_order_order_connection } from "../queries/gqlTypes/CmgtUserOrderByToken";

import {
  UserOrderByToken_orderByToken_shippingAddress_country,
  UserOrderByToken_orderByToken_shippingAddress,
  UserOrderByToken_orderByToken_lines_variant_pricing_priceUndiscounted_gross,
  UserOrderByToken_orderByToken_lines_variant_pricing_priceUndiscounted_net,
  UserOrderByToken_orderByToken_lines_variant_pricing_priceUndiscounted,
  UserOrderByToken_orderByToken_lines_variant_pricing_price_gross,
  UserOrderByToken_orderByToken_lines_variant_pricing_price_net,
  UserOrderByToken_orderByToken_lines_variant_pricing_price,
  UserOrderByToken_orderByToken_lines_variant_pricing,
  UserOrderByToken_orderByToken_lines_variant_attributes_attribute,
  UserOrderByToken_orderByToken_lines_variant_attributes_values,
  UserOrderByToken_orderByToken_lines_variant_attributes,
  UserOrderByToken_orderByToken_lines_variant_product_thumbnail,
  UserOrderByToken_orderByToken_lines_variant_product_thumbnail2x,
  UserOrderByToken_orderByToken_lines_variant_product_productType,
  UserOrderByToken_orderByToken_lines_variant_product,
  UserOrderByToken_orderByToken_lines_variant,
  UserOrderByToken_orderByToken_lines_unitPrice_gross,
  UserOrderByToken_orderByToken_lines_unitPrice_net,
  UserOrderByToken_orderByToken_lines_unitPrice,
  UserOrderByToken_orderByToken_lines_totalPrice_gross,
  UserOrderByToken_orderByToken_lines_totalPrice_net,
  UserOrderByToken_orderByToken_lines_totalPrice,
  UserOrderByToken_orderByToken_lines,
  UserOrderByToken_orderByToken_subtotal_gross,
  UserOrderByToken_orderByToken_subtotal_net,
  UserOrderByToken_orderByToken_subtotal,
  UserOrderByToken_orderByToken_total_gross,
  UserOrderByToken_orderByToken_total_net,
  UserOrderByToken_orderByToken_total,
  UserOrderByToken_orderByToken_shippingPrice_gross,
  UserOrderByToken_orderByToken_shippingPrice_net,
  UserOrderByToken_orderByToken_shippingPrice,
  UserOrderByToken_orderByToken_invoices,
  UserOrderByToken_orderByToken,
} from "../queries/gqlTypes/UserOrderByToken";

import {
  JobStatusEnum,
  OrderStatus,
  PaymentChargeStatusEnum,
} from "../gqlTypes/globalTypes";

// userOrderDetailsByTokenVariantsResponse
import { CmgtOrderByToken_order_order_connection } from "../queries/gqlTypes/CmgtOrderByToken";

import {
  OrderByToken_orderByToken_shippingAddress_country,
  OrderByToken_orderByToken_shippingAddress,
  OrderByToken_orderByToken_lines_variant_pricing_priceUndiscounted_gross,
  OrderByToken_orderByToken_lines_variant_pricing_priceUndiscounted_net,
  OrderByToken_orderByToken_lines_variant_pricing_priceUndiscounted,
  OrderByToken_orderByToken_lines_variant_pricing_price_gross,
  OrderByToken_orderByToken_lines_variant_pricing_price_net,
  OrderByToken_orderByToken_lines_variant_pricing_price,
  OrderByToken_orderByToken_lines_variant_pricing,
  OrderByToken_orderByToken_lines_variant_attributes_attribute,
  OrderByToken_orderByToken_lines_variant_attributes_values,
  OrderByToken_orderByToken_lines_variant_attributes,
  OrderByToken_orderByToken_lines_variant_product_thumbnail,
  OrderByToken_orderByToken_lines_variant_product_thumbnail2x,
  OrderByToken_orderByToken_lines_variant_product_productType,
  OrderByToken_orderByToken_lines_variant_product,
  OrderByToken_orderByToken_lines_variant,
  OrderByToken_orderByToken_lines_unitPrice_gross,
  OrderByToken_orderByToken_lines_unitPrice_net,
  OrderByToken_orderByToken_lines_unitPrice,
  OrderByToken_orderByToken_lines_totalPrice_gross,
  OrderByToken_orderByToken_lines_totalPrice_net,
  OrderByToken_orderByToken_lines_totalPrice,
  OrderByToken_orderByToken_lines,
  OrderByToken_orderByToken_subtotal_gross,
  OrderByToken_orderByToken_subtotal_net,
  OrderByToken_orderByToken_subtotal,
  OrderByToken_orderByToken_total_gross,
  OrderByToken_orderByToken_total_net,
  OrderByToken_orderByToken_total,
  OrderByToken_orderByToken_shippingPrice_gross,
  OrderByToken_orderByToken_shippingPrice_net,
  OrderByToken_orderByToken_shippingPrice,
  OrderByToken_orderByToken,
} from "../queries/gqlTypes/OrderByToken";

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
    // TODO : 税金計算必要
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

    const statusDisplayVariant = nodeData.status
      .replace("-", " ")
      .replace(/\b[a-z]/, letter => letter.toUpperCase());

    const OrdersByUserMeOrdersEdgesNode: OrdersByUser_me_orders_edges_node = {
      __typename: "Order",
      id: nodeData.id,
      token: nodeData.token,
      number: nodeData.id,
      statusDisplay: statusDisplayVariant,
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

// CmgtOrderDetailsByUser
export const userOrderDetailsByTokenVariantsResponse = (
  CmgtUserOrderByToken: CmgtUserOrderByToken_order_order_connection | null
) => {
  const nodeData = CmgtUserOrderByToken?.edges[0].node;
  const currencyCode = nodeData?.currency || "JPY";
  const shippingAddress = nodeData?.accountAddressByShippingAddressId;

  const UserOrderByTokenOrderByTokenShippingAddressCountry: UserOrderByToken_orderByToken_shippingAddress_country = {
    __typename: "CountryDisplay",
    code: currencyCode,
    country: shippingAddress?.country || "",
  };

  const UserOrderByTokenOrderByTokenShippingAddress: UserOrderByToken_orderByToken_shippingAddress = {
    __typename: "Address",
    id: shippingAddress?.id || "",
    firstName: shippingAddress?.first_name || "",
    lastName: shippingAddress?.last_name || "",
    companyName: shippingAddress?.company_name || "",
    streetAddress1: shippingAddress?.street_address_1 || "",
    streetAddress2: shippingAddress?.street_address_1 || "",
    city: shippingAddress?.city || "",
    postalCode: shippingAddress?.postal_code || "",
    country: UserOrderByTokenOrderByTokenShippingAddressCountry,
    countryArea: shippingAddress?.country_area || "",
    phone: shippingAddress?.phone || "",
    isDefaultBillingAddress: false,
    isDefaultShippingAddress: false,
  };

  const linesVariant = nodeData?.order_orderlines.map(line => {
    const currencyVariant = line.currency;
    const productPriceGross = line.pms_saleproduct?.pms_product?.sale_price;
    const productPriceNet = line.pms_saleproduct?.pms_product?.sale_price;
    const productUndiscountedPriceGross =
      line.pms_saleproduct?.pms_product?.sale_price;
    const productUndiscountedPriceNet =
      line.pms_saleproduct?.pms_product?.sale_price;

    const UserOrderByTokenOrderByTokenLinesVariantPricingPriceUndiscountedGross: UserOrderByToken_orderByToken_lines_variant_pricing_priceUndiscounted_gross = {
      __typename: "Money",
      amount: productUndiscountedPriceGross,
      currency: currencyVariant,
    };

    const UserOrderByTokenOrderByTokenLinesVariantPricingPriceUndiscountedNet: UserOrderByToken_orderByToken_lines_variant_pricing_priceUndiscounted_net = {
      __typename: "Money",
      amount: productUndiscountedPriceNet,
      currency: currencyVariant,
    };

    const UserOrderByTokenOrderByTokenLinesVariantPricingPriceUndiscounted: UserOrderByToken_orderByToken_lines_variant_pricing_priceUndiscounted = {
      __typename: "TaxedMoney",
      gross: UserOrderByTokenOrderByTokenLinesVariantPricingPriceUndiscountedGross,
      net: UserOrderByTokenOrderByTokenLinesVariantPricingPriceUndiscountedNet,
    };
    const UserOrderByTokenOrderByTokenLinesVariantPricingPriceGross: UserOrderByToken_orderByToken_lines_variant_pricing_price_gross = {
      __typename: "Money",
      amount: productPriceGross,
      currency: currencyVariant,
    };

    const UserOrderByTokenOrderByTokenLinesVariantPricingPriceNet: UserOrderByToken_orderByToken_lines_variant_pricing_price_net = {
      __typename: "Money",
      amount: productPriceNet,
      currency: currencyVariant,
    };

    const UserOrderByTokenOrderByTokenLinesVariantPricingPrice: UserOrderByToken_orderByToken_lines_variant_pricing_price = {
      __typename: "TaxedMoney",
      gross: UserOrderByTokenOrderByTokenLinesVariantPricingPriceGross,
      net: UserOrderByTokenOrderByTokenLinesVariantPricingPriceNet,
    };

    const UserOrderByTokenOrderByTokenLinesVariantPricing: UserOrderByToken_orderByToken_lines_variant_pricing = {
      __typename: "VariantPricingInfo",
      onSale: false,
      priceUndiscounted: UserOrderByTokenOrderByTokenLinesVariantPricingPriceUndiscounted,
      price: UserOrderByTokenOrderByTokenLinesVariantPricingPrice,
    };

    // Option
    const attributesVariant = line.pms_saleproduct?.pms_saleproductoptionvalues.map(
      value => {
        const UserOrderByTokenOrderByTokenLinesVariantAttributesAttribute: UserOrderByToken_orderByToken_lines_variant_attributes_attribute = {
          __typename: "Attribute",
          id: value.pms_productoptionvalue?.pms_productoption?.id || "",
          name:
            value.pms_productoptionvalue?.pms_productoption?.option_name || "",
        };

        const UserOrderByTokenOrderByTokenLinesVariantAttributesValues: UserOrderByToken_orderByToken_lines_variant_attributes_values[] = [];

        UserOrderByTokenOrderByTokenLinesVariantAttributesValues.push({
          __typename: "AttributeValue",
          id: value.pms_productoptionvalue?.id || "",
          name: value.pms_productoptionvalue?.option_value || "",
          value: value.pms_productoptionvalue?.attribute_value || "",
        });

        const UserOrderByTokenOrderByTokenLinesVariantAttributes: UserOrderByToken_orderByToken_lines_variant_attributes = {
          __typename: "SelectedAttribute",
          attribute: UserOrderByTokenOrderByTokenLinesVariantAttributesAttribute,
          values: UserOrderByTokenOrderByTokenLinesVariantAttributesValues,
        };

        return UserOrderByTokenOrderByTokenLinesVariantAttributes;
      }
    );

    const imgUrl = line.pms_productimg?.img || "";

    const UserOrderByTokenOrderByTokenLinesVariantProductThumbnail: UserOrderByToken_orderByToken_lines_variant_product_thumbnail = {
      __typename: "Image",
      url: imgUrl,
      alt: "",
    };

    const UserOrderByTokenOrderByTokenLinesVariantProductThumbnail2x: UserOrderByToken_orderByToken_lines_variant_product_thumbnail2x = {
      __typename: "Image",
      url: imgUrl,
    };

    const UserOrderByTokenOrderByTokenLinesVariantProductProductType: UserOrderByToken_orderByToken_lines_variant_product_productType = {
      __typename: "ProductType",
      id: "",
      isShippingRequired: false,
    };

    const UserOrderByTokenOrderByTokenLinesVariantProduct: UserOrderByToken_orderByToken_lines_variant_product = {
      __typename: "Product",
      id: line.pms_saleproduct?.pms_product?.id || "",
      name: line.pms_saleproduct?.pms_product?.name || "",
      thumbnail: UserOrderByTokenOrderByTokenLinesVariantProductThumbnail,
      thumbnail2x: UserOrderByTokenOrderByTokenLinesVariantProductThumbnail2x,
      productType: UserOrderByTokenOrderByTokenLinesVariantProductProductType,
    };

    const UserOrderByTokenOrderByTokenLinesVariant: UserOrderByToken_orderByToken_lines_variant = {
      __typename: "ProductVariant",
      id: line.pms_saleproduct?.id || "",
      name: line.pms_saleproduct?.name || "",
      sku: line.pms_saleproduct?.saleproduct_id || "",
      quantityAvailable: 0,
      pricing: UserOrderByTokenOrderByTokenLinesVariantPricing,
      attributes: attributesVariant || [],
      product: UserOrderByTokenOrderByTokenLinesVariantProduct,
    };

    // TODO : 税金計算必要
    const lineUnitPriceGross = line.unit_price_gross_amount / line.quantity;
    const lineUnitPriceNet = line.unit_price_gross_amount / line.quantity;
    const lineTotalPriceGross = line.unit_price_gross_amount;
    const lintTotalPriceNet = line.unit_price_gross_amount;

    const UserOrderByTokenOrderByTokenLinesUnitPriceGross: UserOrderByToken_orderByToken_lines_unitPrice_gross = {
      __typename: "Money",
      amount: lineUnitPriceGross,
      currency: currencyVariant,
    };

    const UserOrderByTokenOrderByTokenLinesUnitPriceNet: UserOrderByToken_orderByToken_lines_unitPrice_net = {
      __typename: "Money",
      amount: lineUnitPriceNet,
      currency: currencyVariant,
    };

    const UserOrderByTokenOrderByTokenLinesUnitPrice: UserOrderByToken_orderByToken_lines_unitPrice = {
      __typename: "TaxedMoney",
      currency: currencyVariant,
      gross: UserOrderByTokenOrderByTokenLinesUnitPriceGross,
      net: UserOrderByTokenOrderByTokenLinesUnitPriceNet,
    };

    const UserOrderByTokenOrderByTokenLinesTotalPriceGross: UserOrderByToken_orderByToken_lines_totalPrice_gross = {
      __typename: "Money",
      amount: lineTotalPriceGross,
      currency: currencyVariant,
    };

    const UserOrderByTokenOrderByTokenLinesTotalPriceNet: UserOrderByToken_orderByToken_lines_totalPrice_net = {
      __typename: "Money",
      amount: lintTotalPriceNet,
      currency: currencyVariant,
    };

    const UserOrderByTokenOrderByTokenLinesTotalPrice: UserOrderByToken_orderByToken_lines_totalPrice = {
      __typename: "TaxedMoney",
      currency: currencyVariant,
      gross: UserOrderByTokenOrderByTokenLinesTotalPriceGross,
      net: UserOrderByTokenOrderByTokenLinesTotalPriceNet,
    };

    const UserOrderByTokenOrderByTokenLines: UserOrderByToken_orderByToken_lines = {
      __typename: "OrderLine",
      productName: line.product_name,
      quantity: line.quantity,
      variant: UserOrderByTokenOrderByTokenLinesVariant,
      unitPrice: UserOrderByTokenOrderByTokenLinesUnitPrice,
      totalPrice: UserOrderByTokenOrderByTokenLinesTotalPrice,
    };

    return UserOrderByTokenOrderByTokenLines;
  });

  const totalGross = nodeData?.total_gross_amount;

  // TODO : 配送料と商品の税金計算必要
  const totalNet = nodeData?.total_gross_amount;

  const subTotalGross =
    nodeData?.total_gross_amount - nodeData?.shipping_price_gross_amount;

  // TODO : 配送先税金計算必要
  const subTotalNet =
    nodeData?.total_gross_amount - nodeData?.shipping_price_net_amount;

  const UserOrderByTokenOrderByTokenSubtotalGross: UserOrderByToken_orderByToken_subtotal_gross = {
    __typename: "Money",
    amount: subTotalGross,
    currency: currencyCode,
  };

  const UserOrderByTokenOrderByTokenSubtotalNet: UserOrderByToken_orderByToken_subtotal_net = {
    __typename: "Money",
    amount: subTotalNet,
    currency: currencyCode,
  };

  const UserOrderByTokenOrderByTokenSubtotal: UserOrderByToken_orderByToken_subtotal = {
    __typename: "TaxedMoney",
    gross: UserOrderByTokenOrderByTokenSubtotalGross,
    net: UserOrderByTokenOrderByTokenSubtotalNet,
  };

  const UserOrderByTokenOrderByTokenTotalGross: UserOrderByToken_orderByToken_total_gross = {
    __typename: "Money",
    amount: totalGross,
    currency: currencyCode,
  };

  const UserOrderByTokenOrderByTokenTotalNet: UserOrderByToken_orderByToken_total_net = {
    __typename: "Money",
    amount: totalNet,
    currency: currencyCode,
  };

  const UserOrderByTokenOrderByTokenTotal: UserOrderByToken_orderByToken_total = {
    __typename: "TaxedMoney",
    gross: UserOrderByTokenOrderByTokenTotalGross,
    net: UserOrderByTokenOrderByTokenTotalNet,
  };

  const UserOrderByTokenOrderByTokenShippingPriceGross: UserOrderByToken_orderByToken_shippingPrice_gross = {
    __typename: "Money",
    amount: nodeData?.shipping_price_gross_amount,
    currency: currencyCode,
  };

  const UserOrderByTokenOrderByTokenShippingPriceNet: UserOrderByToken_orderByToken_shippingPrice_net = {
    __typename: "Money",
    amount: nodeData?.shipping_price_net_amount,
    currency: currencyCode,
  };

  const UserOrderByTokenOrderByTokenShippingPrice: UserOrderByToken_orderByToken_shippingPrice = {
    __typename: "TaxedMoney",
    gross: UserOrderByTokenOrderByTokenShippingPriceGross,
    net: UserOrderByTokenOrderByTokenShippingPriceNet,
  };

  const invoiceVariant = nodeData?.invoice_invoices.map(invoice => {
    let invoiceStatusVariant = JobStatusEnum.PENDING;
    switch (invoice.status.toUpperCase()) {
      case "DELETED":
        invoiceStatusVariant = JobStatusEnum.DELETED;
        break;
      case "FAILED":
        invoiceStatusVariant = JobStatusEnum.FAILED;
        break;
      case "PENDING":
        invoiceStatusVariant = JobStatusEnum.PENDING;
        break;
      case "SUCCESS":
        invoiceStatusVariant = JobStatusEnum.SUCCESS;
        break;
      default:
        break;
    }

    const UserOrderByTokenOrderByTokenInvoices: UserOrderByToken_orderByToken_invoices = {
      __typename: "Invoice",
      id: invoice.id,
      number: invoice.number,
      createdAt: invoice.created_at,
      url: invoice.external_url,
      status: invoiceStatusVariant,
    };

    return UserOrderByTokenOrderByTokenInvoices;
  });

  let orderStatusVariant = OrderStatus.UNFULFILLED;
  switch (nodeData?.status.toUpperCase()) {
    case "CANCELED":
      orderStatusVariant = OrderStatus.CANCELED;
      break;
    case "DRAFT":
      orderStatusVariant = OrderStatus.DRAFT;
      break;
    case "FULFILLED":
      orderStatusVariant = OrderStatus.FULFILLED;
      break;
    case "PARTIALLY_FULFILLED":
      orderStatusVariant = OrderStatus.PARTIALLY_FULFILLED;
      break;
    case "PARTIALLY_RETURNED":
      orderStatusVariant = OrderStatus.PARTIALLY_RETURNED;
      break;
    case "RETURNED":
      orderStatusVariant = OrderStatus.RETURNED;
      break;
    case "UNCONFIRMED":
      orderStatusVariant = OrderStatus.UNCONFIRMED;
      break;
    case "UNFULFILLED":
      orderStatusVariant = OrderStatus.UNFULFILLED;
      break;
    default:
      break;
  }

  let paymentStatusVariant = PaymentChargeStatusEnum.FULLY_CHARGED;
  switch (nodeData?.payment_payments[0].charge_status.toUpperCase()) {
    case "CANCELLED":
      paymentStatusVariant = PaymentChargeStatusEnum.CANCELLED;
      break;
    case "FULLY_CHARGED":
      paymentStatusVariant = PaymentChargeStatusEnum.FULLY_CHARGED;
      break;
    case "FULLY_REFUNDED":
      paymentStatusVariant = PaymentChargeStatusEnum.FULLY_REFUNDED;
      break;
    case "NOT_CHARGED":
      paymentStatusVariant = PaymentChargeStatusEnum.NOT_CHARGED;
      break;
    case "PARTIALLY_CHARGED":
      paymentStatusVariant = PaymentChargeStatusEnum.PARTIALLY_CHARGED;
      break;
    case "PARTIALLY_REFUNDED":
      paymentStatusVariant = PaymentChargeStatusEnum.PARTIALLY_REFUNDED;
      break;
    case "PENDING":
      paymentStatusVariant = PaymentChargeStatusEnum.PENDING;
      break;
    case "REFUSED":
      paymentStatusVariant = PaymentChargeStatusEnum.REFUSED;
      break;
    default:
      break;
  }

  const chnagePymentStatusDisplay = nodeData?.payment_payments[0].charge_status
    .replace("-", " ")
    .replace(/\b[a-z]/, letter => letter.toUpperCase());
  const changeStatusDisplay = nodeData?.status
    .replace("-", " ")
    .replace(/\b[a-z]/, letter => letter.toUpperCase());

  const UserOrderByTokenOrderByToken: UserOrderByToken_orderByToken = {
    __typename: "Order",
    userEmail: nodeData?.user_email || "",
    paymentStatus: paymentStatusVariant,
    paymentStatusDisplay: chnagePymentStatusDisplay || "",
    status: orderStatusVariant,
    statusDisplay: changeStatusDisplay || "",
    id: nodeData?.id || "",
    token: nodeData?.total_gross_amount,
    number: "",
    shippingAddress: UserOrderByTokenOrderByTokenShippingAddress,
    lines: linesVariant || [],
    subtotal: UserOrderByTokenOrderByTokenSubtotal,
    total: UserOrderByTokenOrderByTokenTotal,
    shippingPrice: UserOrderByTokenOrderByTokenShippingPrice,
    invoices: invoiceVariant || [],
  };

  return UserOrderByTokenOrderByToken;
};

// CmgtOrderDetails
export const orderDetailsByTokenVariantsResponse = (
  CmgtOrderByToken: CmgtOrderByToken_order_order_connection | null
) => {
  const nodeData = CmgtOrderByToken?.edges[0].node;
  const currencyCode = nodeData?.currency || "JPY";
  const shippingAddress = nodeData?.accountAddressByShippingAddressId;

  const orderByTokenOrderByTokenShippingAddressCountry: OrderByToken_orderByToken_shippingAddress_country = {
    __typename: "CountryDisplay",
    code: currencyCode,
    country: shippingAddress?.country || "",
  };

  const orderByTokenOrderByTokenShippingAddress: OrderByToken_orderByToken_shippingAddress = {
    __typename: "Address",
    id: shippingAddress?.id || "",
    firstName: shippingAddress?.first_name || "",
    lastName: shippingAddress?.last_name || "",
    companyName: shippingAddress?.company_name || "",
    streetAddress1: shippingAddress?.street_address_1 || "",
    streetAddress2: shippingAddress?.street_address_1 || "",
    city: shippingAddress?.city || "",
    postalCode: shippingAddress?.postal_code || "",
    country: orderByTokenOrderByTokenShippingAddressCountry,
    countryArea: shippingAddress?.country_area || "",
    phone: shippingAddress?.phone || "",
    isDefaultBillingAddress: false,
    isDefaultShippingAddress: false,
  };

  const linesVariant = nodeData?.order_orderlines.map(line => {
    const currencyVariant = line.currency;
    const productPriceGross = line.pms_saleproduct?.pms_product?.sale_price;
    const productPriceNet = line.pms_saleproduct?.pms_product?.sale_price;
    const productUndiscountedPriceGross =
      line.pms_saleproduct?.pms_product?.sale_price;
    const productUndiscountedPriceNet =
      line.pms_saleproduct?.pms_product?.sale_price;

    const orderByTokenOrderByTokenLinesVariantPricingPriceUndiscountedGross: OrderByToken_orderByToken_lines_variant_pricing_priceUndiscounted_gross = {
      __typename: "Money",
      amount: productUndiscountedPriceGross,
      currency: currencyVariant,
    };

    const orderByTokenOrderByTokenLinesVariantPricingPriceUndiscountedNet: OrderByToken_orderByToken_lines_variant_pricing_priceUndiscounted_net = {
      __typename: "Money",
      amount: productUndiscountedPriceNet,
      currency: currencyVariant,
    };

    const orderByTokenOrderByTokenLinesVariantPricingPriceUndiscounted: OrderByToken_orderByToken_lines_variant_pricing_priceUndiscounted = {
      __typename: "TaxedMoney",
      gross: orderByTokenOrderByTokenLinesVariantPricingPriceUndiscountedGross,
      net: orderByTokenOrderByTokenLinesVariantPricingPriceUndiscountedNet,
    };
    const orderByTokenOrderByTokenLinesVariantPricingPriceGross: OrderByToken_orderByToken_lines_variant_pricing_price_gross = {
      __typename: "Money",
      amount: productPriceGross,
      currency: currencyVariant,
    };

    const orderByTokenOrderByTokenLinesVariantPricingPriceNet: OrderByToken_orderByToken_lines_variant_pricing_price_net = {
      __typename: "Money",
      amount: productPriceNet,
      currency: currencyVariant,
    };

    const orderByTokenOrderByTokenLinesVariantPricingPrice: OrderByToken_orderByToken_lines_variant_pricing_price = {
      __typename: "TaxedMoney",
      gross: orderByTokenOrderByTokenLinesVariantPricingPriceGross,
      net: orderByTokenOrderByTokenLinesVariantPricingPriceNet,
    };

    const orderByTokenOrderByTokenLinesVariantPricing: OrderByToken_orderByToken_lines_variant_pricing = {
      __typename: "VariantPricingInfo",
      onSale: false,
      priceUndiscounted: orderByTokenOrderByTokenLinesVariantPricingPriceUndiscounted,
      price: orderByTokenOrderByTokenLinesVariantPricingPrice,
    };

    // Option
    const attributesVariant = line.pms_saleproduct?.pms_saleproductoptionvalues.map(
      value => {
        const orderByTokenOrderByTokenLinesVariantAttributesAttribute: OrderByToken_orderByToken_lines_variant_attributes_attribute = {
          __typename: "Attribute",
          id: value.pms_productoptionvalue?.pms_productoption?.id || "",
          name:
            value.pms_productoptionvalue?.pms_productoption?.option_name || "",
        };

        const orderByTokenOrderByTokenLinesVariantAttributesValues: OrderByToken_orderByToken_lines_variant_attributes_values[] = [];

        orderByTokenOrderByTokenLinesVariantAttributesValues.push({
          __typename: "AttributeValue",
          id: value.pms_productoptionvalue?.id || "",
          name: value.pms_productoptionvalue?.option_value || "",
          value: value.pms_productoptionvalue?.attribute_value || "",
        });

        const orderByTokenOrderByTokenLinesVariantAttributes: OrderByToken_orderByToken_lines_variant_attributes = {
          __typename: "SelectedAttribute",
          attribute: orderByTokenOrderByTokenLinesVariantAttributesAttribute,
          values: orderByTokenOrderByTokenLinesVariantAttributesValues,
        };

        return orderByTokenOrderByTokenLinesVariantAttributes;
      }
    );

    const imgUrl = line.pms_productimg?.img || "";

    const orderByTokenOrderByTokenLinesVariantProductThumbnail: OrderByToken_orderByToken_lines_variant_product_thumbnail = {
      __typename: "Image",
      url: imgUrl,
      alt: "",
    };

    const orderByTokenOrderByTokenLinesVariantProductThumbnail2x: OrderByToken_orderByToken_lines_variant_product_thumbnail2x = {
      __typename: "Image",
      url: imgUrl,
    };

    const orderByTokenOrderByTokenLinesVariantProductProductType: OrderByToken_orderByToken_lines_variant_product_productType = {
      __typename: "ProductType",
      id: "",
      isShippingRequired: false,
    };

    const orderByTokenOrderByTokenLinesVariantProduct: OrderByToken_orderByToken_lines_variant_product = {
      __typename: "Product",
      id: line.pms_saleproduct?.pms_product?.id || "",
      name: line.pms_saleproduct?.pms_product?.name || "",
      thumbnail: orderByTokenOrderByTokenLinesVariantProductThumbnail,
      thumbnail2x: orderByTokenOrderByTokenLinesVariantProductThumbnail2x,
      productType: orderByTokenOrderByTokenLinesVariantProductProductType,
    };

    const orderByTokenOrderByTokenLinesVariant: OrderByToken_orderByToken_lines_variant = {
      __typename: "ProductVariant",
      id: line.pms_saleproduct?.id || "",
      name: line.pms_saleproduct?.name || "",
      sku: line.pms_saleproduct?.saleproduct_id || "",
      quantityAvailable: 0,
      pricing: orderByTokenOrderByTokenLinesVariantPricing,
      attributes: attributesVariant || [],
      product: orderByTokenOrderByTokenLinesVariantProduct,
    };

    // TODO : 税金計算必要
    const lineUnitPriceGross = line.unit_price_gross_amount / line.quantity;
    const lineUnitPriceNet = line.unit_price_gross_amount / line.quantity;
    const lineTotalPriceGross = line.unit_price_gross_amount;
    const lintTotalPriceNet = line.unit_price_gross_amount;

    const orderByTokenOrderByTokenLinesUnitPriceGross: OrderByToken_orderByToken_lines_unitPrice_gross = {
      __typename: "Money",
      amount: lineUnitPriceGross,
      currency: currencyVariant,
    };

    const orderByTokenOrderByTokenLinesUnitPriceNet: OrderByToken_orderByToken_lines_unitPrice_net = {
      __typename: "Money",
      amount: lineUnitPriceNet,
      currency: currencyVariant,
    };

    const orderByTokenOrderByTokenLinesUnitPrice: OrderByToken_orderByToken_lines_unitPrice = {
      __typename: "TaxedMoney",
      currency: currencyVariant,
      gross: orderByTokenOrderByTokenLinesUnitPriceGross,
      net: orderByTokenOrderByTokenLinesUnitPriceNet,
    };

    const orderByTokenOrderByTokenLinesTotalPriceGross: OrderByToken_orderByToken_lines_totalPrice_gross = {
      __typename: "Money",
      amount: lineTotalPriceGross,
      currency: currencyVariant,
    };

    const orderByTokenOrderByTokenLinesTotalPriceNet: OrderByToken_orderByToken_lines_totalPrice_net = {
      __typename: "Money",
      amount: lintTotalPriceNet,
      currency: currencyVariant,
    };

    const orderByTokenOrderByTokenLinesTotalPrice: OrderByToken_orderByToken_lines_totalPrice = {
      __typename: "TaxedMoney",
      currency: currencyVariant,
      gross: orderByTokenOrderByTokenLinesTotalPriceGross,
      net: orderByTokenOrderByTokenLinesTotalPriceNet,
    };

    const orderByTokenOrderByTokenLines: OrderByToken_orderByToken_lines = {
      __typename: "OrderLine",
      productName: line.product_name,
      quantity: line.quantity,
      variant: orderByTokenOrderByTokenLinesVariant,
      unitPrice: orderByTokenOrderByTokenLinesUnitPrice,
      totalPrice: orderByTokenOrderByTokenLinesTotalPrice,
    };

    return orderByTokenOrderByTokenLines;
  });

  const totalGross = nodeData?.total_gross_amount;

  // TODO : 配送料と商品の税金計算必要
  const totalNet = nodeData?.total_gross_amount;

  const subTotalGross =
    nodeData?.total_gross_amount - nodeData?.shipping_price_gross_amount;

  // TODO : 配送先税金計算必要
  const subTotalNet =
    nodeData?.total_gross_amount - nodeData?.shipping_price_net_amount;

  const orderByTokenOrderByTokenSubtotalGross: OrderByToken_orderByToken_subtotal_gross = {
    __typename: "Money",
    amount: subTotalGross,
    currency: currencyCode,
  };

  const orderByTokenOrderByTokenSubtotalNet: OrderByToken_orderByToken_subtotal_net = {
    __typename: "Money",
    amount: subTotalNet,
    currency: currencyCode,
  };

  const orderByTokenOrderByTokenSubtotal: OrderByToken_orderByToken_subtotal = {
    __typename: "TaxedMoney",
    gross: orderByTokenOrderByTokenSubtotalGross,
    net: orderByTokenOrderByTokenSubtotalNet,
  };

  const orderByTokenOrderByTokenTotalGross: OrderByToken_orderByToken_total_gross = {
    __typename: "Money",
    amount: totalGross,
    currency: currencyCode,
  };

  const orderByTokenOrderByTokenTotalNet: OrderByToken_orderByToken_total_net = {
    __typename: "Money",
    amount: totalNet,
    currency: currencyCode,
  };

  const orderByTokenOrderByTokenTotal: OrderByToken_orderByToken_total = {
    __typename: "TaxedMoney",
    gross: orderByTokenOrderByTokenTotalGross,
    net: orderByTokenOrderByTokenTotalNet,
  };

  const orderByTokenOrderByTokenShippingPriceGross: OrderByToken_orderByToken_shippingPrice_gross = {
    __typename: "Money",
    amount: nodeData?.shipping_price_gross_amount,
    currency: currencyCode,
  };

  const orderByTokenOrderByTokenShippingPriceNet: OrderByToken_orderByToken_shippingPrice_net = {
    __typename: "Money",
    amount: nodeData?.shipping_price_net_amount,
    currency: currencyCode,
  };

  const orderByTokenOrderByTokenShippingPrice: OrderByToken_orderByToken_shippingPrice = {
    __typename: "TaxedMoney",
    gross: orderByTokenOrderByTokenShippingPriceGross,
    net: orderByTokenOrderByTokenShippingPriceNet,
  };

  let orderStatusVariant = OrderStatus.UNFULFILLED;
  switch (nodeData?.status.toUpperCase()) {
    case "CANCELED":
      orderStatusVariant = OrderStatus.CANCELED;
      break;
    case "DRAFT":
      orderStatusVariant = OrderStatus.DRAFT;
      break;
    case "FULFILLED":
      orderStatusVariant = OrderStatus.FULFILLED;
      break;
    case "PARTIALLY_FULFILLED":
      orderStatusVariant = OrderStatus.PARTIALLY_FULFILLED;
      break;
    case "PARTIALLY_RETURNED":
      orderStatusVariant = OrderStatus.PARTIALLY_RETURNED;
      break;
    case "RETURNED":
      orderStatusVariant = OrderStatus.RETURNED;
      break;
    case "UNCONFIRMED":
      orderStatusVariant = OrderStatus.UNCONFIRMED;
      break;
    case "UNFULFILLED":
      orderStatusVariant = OrderStatus.UNFULFILLED;
      break;
    default:
      break;
  }

  let paymentStatusVariant = PaymentChargeStatusEnum.FULLY_CHARGED;
  switch (nodeData?.payment_payments[0].charge_status.toUpperCase()) {
    case "CANCELLED":
      paymentStatusVariant = PaymentChargeStatusEnum.CANCELLED;
      break;
    case "FULLY_CHARGED":
      paymentStatusVariant = PaymentChargeStatusEnum.FULLY_CHARGED;
      break;
    case "FULLY_REFUNDED":
      paymentStatusVariant = PaymentChargeStatusEnum.FULLY_REFUNDED;
      break;
    case "NOT_CHARGED":
      paymentStatusVariant = PaymentChargeStatusEnum.NOT_CHARGED;
      break;
    case "PARTIALLY_CHARGED":
      paymentStatusVariant = PaymentChargeStatusEnum.PARTIALLY_CHARGED;
      break;
    case "PARTIALLY_REFUNDED":
      paymentStatusVariant = PaymentChargeStatusEnum.PARTIALLY_REFUNDED;
      break;
    case "PENDING":
      paymentStatusVariant = PaymentChargeStatusEnum.PENDING;
      break;
    case "REFUSED":
      paymentStatusVariant = PaymentChargeStatusEnum.REFUSED;
      break;
    default:
      break;
  }

  const orderByTokenOrderByToken: OrderByToken_orderByToken = {
    __typename: "Order",
    userEmail: nodeData?.user_email || "",
    paymentStatus: paymentStatusVariant,
    paymentStatusDisplay: nodeData?.payment_payments[0].charge_status || "",
    status: orderStatusVariant,
    statusDisplay: nodeData?.status || "",
    id: nodeData?.id || "",
    token: nodeData?.total_gross_amount,
    number: "",
    shippingAddress: orderByTokenOrderByTokenShippingAddress,
    lines: linesVariant || [],
    subtotal: orderByTokenOrderByTokenSubtotal,
    total: orderByTokenOrderByTokenTotal,
    shippingPrice: orderByTokenOrderByTokenShippingPrice,
  };

  return orderByTokenOrderByToken;
};
