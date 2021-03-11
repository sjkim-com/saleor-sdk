/* eslint-disable prettier/prettier */

import { sumBy } from "lodash";

import {
  CmgtCheckoutProductVariants_pms_saleproduct_connection,
  CmgtCheckoutProductVariants_pms_saleproduct_connection_edges_node,
} from "../queries/gqlTypes/CmgtCheckoutProductVariants";

import {
  CheckoutProductVariants_productVariants_edges_node_pricing_priceUndiscounted_gross,
  CheckoutProductVariants_productVariants_edges_node_pricing_priceUndiscounted_net,
  CheckoutProductVariants_productVariants_edges_node_pricing_priceUndiscounted,
  CheckoutProductVariants_productVariants_edges_node_pricing_price_gross,
  CheckoutProductVariants_productVariants_edges_node_pricing_price_net,
  CheckoutProductVariants_productVariants_edges_node_pricing_price,
  CheckoutProductVariants_productVariants_edges_node_pricing,
  CheckoutProductVariants_productVariants_edges_node_attributes_attribute,
  CheckoutProductVariants_productVariants_edges_node_attributes_values,
  CheckoutProductVariants_productVariants_edges_node_attributes,
  CheckoutProductVariants_productVariants_edges_node_product_thumbnail,
  CheckoutProductVariants_productVariants_edges_node_product_thumbnail2x,
  CheckoutProductVariants_productVariants_edges_node_product_productType,
  CheckoutProductVariants_productVariants_edges_node_product,
  CheckoutProductVariants_productVariants_edges_node,
  CheckoutProductVariants_productVariants_edges,
  CheckoutProductVariants_productVariants,
} from "../queries/gqlTypes/CheckoutProductVariants";

export const createCheckoutProductVariantsResponse = (
  CmgtCheckoutProductVariants:
    | CmgtCheckoutProductVariants_pms_saleproduct_connection
    | null
    | undefined
) => {
  const result = CmgtCheckoutProductVariants?.edges.map(edge => {
    const saleProduct: CmgtCheckoutProductVariants_pms_saleproduct_connection_edges_node =
      edge.node;

    const currencyCode = "JPY";
    const productPriceGross = saleProduct.pms_product?.sale_price;
    const productPriceNet = saleProduct.pms_product?.sale_price;
    const productUndiscountedPriceGross = saleProduct.pms_product?.sale_price;
    const productUndiscountedPriceNet = saleProduct.pms_product?.sale_price;
    const productImageUrl = saleProduct.pms_product?.pms_productimgs.filter(
      img => img.sort_no === 1
    )[0].img!;

    let stockQty =
      sumBy(saleProduct.pms_warehousestocks, "stock_qty") -
      sumBy(saleProduct.pms_warehousestocks, "safe_stock_qty");

    stockQty = stockQty > 0 ? stockQty : 0;

    const pricing_priceUndiscounted_gross: CheckoutProductVariants_productVariants_edges_node_pricing_priceUndiscounted_gross = {
      __typename: "Money",
      amount: productUndiscountedPriceNet,
      currency: currencyCode,
    };

    const pricing_priceUndiscounted_net: CheckoutProductVariants_productVariants_edges_node_pricing_priceUndiscounted_net = {
      __typename: "Money",
      amount: productUndiscountedPriceGross,
      currency: currencyCode,
    };

    const pricing_priceUndiscounted: CheckoutProductVariants_productVariants_edges_node_pricing_priceUndiscounted = {
      __typename: "TaxedMoney",
      gross: pricing_priceUndiscounted_gross,
      net: pricing_priceUndiscounted_net,
    };

    const pricing_price_gross: CheckoutProductVariants_productVariants_edges_node_pricing_price_gross = {
      __typename: "Money",
      amount: productPriceGross,
      currency: currencyCode,
    };

    const pricing_price_net: CheckoutProductVariants_productVariants_edges_node_pricing_price_net = {
      __typename: "Money",
      amount: productPriceNet,
      currency: currencyCode,
    };

    const pricing_price: CheckoutProductVariants_productVariants_edges_node_pricing_price = {
      __typename: "TaxedMoney",
      gross: pricing_price_gross,
      net: pricing_price_net,
    };

    const variantsPricing: CheckoutProductVariants_productVariants_edges_node_pricing = {
      __typename: "VariantPricingInfo",
      onSale: true,
      price: pricing_price,
      priceUndiscounted: pricing_priceUndiscounted,
    };

    const product_thumbnail: CheckoutProductVariants_productVariants_edges_node_product_thumbnail = {
      __typename: "Image",
      alt: "string",
      url: productImageUrl,
    };

    const product_thumbnail2x: CheckoutProductVariants_productVariants_edges_node_product_thumbnail2x = {
      __typename: "Image",
      url: productImageUrl,
    };

    const product_productType: CheckoutProductVariants_productVariants_edges_node_product_productType = {
      __typename: "ProductType",
      id: "string",
      isShippingRequired: true,
    };

    const variantsProduct: CheckoutProductVariants_productVariants_edges_node_product = {
      __typename: "Product",
      id: saleProduct.pms_product?.product_id
        ? saleProduct.pms_product?.product_id
        : "",
      name: saleProduct.pms_product?.name ? saleProduct.pms_product?.name : "",
      productType: product_productType,
      thumbnail: product_thumbnail,
      thumbnail2x: product_thumbnail2x,
    };

    const attributesList = saleProduct.pms_saleproductoptionvalues.map(
      option => {
        const attributes_attribute: CheckoutProductVariants_productVariants_edges_node_attributes_attribute = {
          __typename: "Attribute",
          id: option.pms_productoptionvalue?.pms_productoption?.id
            ? option.pms_productoptionvalue?.pms_productoption?.id
            : "",
          name: option.pms_productoptionvalue?.pms_productoption?.option_name
            ? option.pms_productoptionvalue?.pms_productoption?.option_name
            : "",
        };

        const attributes_values: CheckoutProductVariants_productVariants_edges_node_attributes_values[] = [];

        attributes_values.push({
          __typename: "AttributeValue",
          id: option.pms_productoptionvalue?.id
            ? option.pms_productoptionvalue?.id
            : "",
          name: option.pms_productoptionvalue?.option_value
            ? option.pms_productoptionvalue?.option_value
            : "",
          value: option.pms_productoptionvalue?.attribute_value
            ? option.pms_productoptionvalue?.attribute_value
            : "",
        });

        const attributes: CheckoutProductVariants_productVariants_edges_node_attributes = {
          __typename: "SelectedAttribute",
          attribute: attributes_attribute,
          values: attributes_values,
        };

        return attributes;
      }
    );

    const variantsNode: CheckoutProductVariants_productVariants_edges_node = {
      __typename: "ProductVariant",
      attributes: attributesList,
      id: saleProduct.saleproduct_id,
      name: saleProduct.name ? saleProduct.name : "",
      pricing: variantsPricing,
      product: variantsProduct,
      quantityAvailable: stockQty,
      sku: saleProduct.saleproduct_id,
    };

    const variantsEdges: CheckoutProductVariants_productVariants_edges[] = [];
    variantsEdges.push({
      __typename: "ProductVariantCountableEdge",
      node: variantsNode,
    });

    const variants: CheckoutProductVariants_productVariants = {
      __typename: "ProductVariantCountableConnection",
      edges: variantsEdges,
    };
    return variants;
  });

  return result;
};
