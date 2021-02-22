/* eslint-disable prettier/prettier */

import { v4 as uuidv4 } from "uuid";
import { decoderOfRelayId } from "../utils";

import {
  ICheckoutAddress,
  ICheckoutModel,
  ICheckoutModelLine,
  // ICheckoutModelPromoCodeDiscount,
  // ICheckoutModelPriceValue,
} from "../helpers/LocalStorageHandler";
import {
  Update_address_address_variables,
  Set_address_address_variables_addressObject,
  Update_checkout_checkout_variables_email,
  CreateCheckout_checkout_checkout_variables,
  CreateCheckout_checkout_checkout_variables_checkoutObject,
  Create_address_address_variables,
} from "../mutations/gqlTypes/CmgtCheckoutAddress";

import {
  Set_Target_Checkout_Variables,
  AddPromoCode_discount_voucher_Variables,
} from "../mutations/gqlTypes/CmgtCheckout";

import {
  CombinationLinesType,
  resultAddressType,
  resultCheckoutType,
  resultShippingMethodsType,
  SelectPromoValue,
} from "../data/ApolloClientManager/typesRelay";

import {
  Checkout,
  Checkout_shippingAddress,
  Checkout_discount,
  Checkout_shippingPrice,
} from "../fragments/gqlTypes/Checkout";

export const updateAddressVariablesConvert = (
  addressObject: ICheckoutAddress,
  shippingId: string
) => {
  const variables_addressObject: Set_address_address_variables_addressObject = {
    first_name: addressObject.firstName,
    last_name: addressObject.lastName,
    country: addressObject.country?.code,
    phone: addressObject.phone,
    postal_code: addressObject.postalCode,
    street_address_1: addressObject.streetAddress1,
    street_address_2: addressObject.streetAddress2,
    country_area: addressObject.countryArea,
    company_name: addressObject.companyName,
    city_area: "",
    city: addressObject.city,
  };

  const variables: Update_address_address_variables = {
    addressId: decoderOfRelayId(shippingId),
    addressObject: variables_addressObject,
  };

  return variables;
};

export const setAddressDataCheckoutConvert = (
  addressObject: Set_address_address_variables_addressObject,
  checkout: ICheckoutModel,
  target: string
) => {
  const result_shippingAddress: ICheckoutAddress =
    target !== "Shipping"
      ? checkout.shippingAddress!
      : {
          id: addressObject.id,
          firstName: addressObject.first_name,
          lastName: addressObject.last_name,
          companyName: addressObject.company_name,
          streetAddress1: addressObject.street_address_1,
          streetAddress2: addressObject.street_address_2,
          city: addressObject.city,
          postalCode: addressObject.postal_code,
          countryArea: addressObject.country_area,
          phone: addressObject.phone,
          country: {
            code: addressObject.country,
            country: "Japan",
          },
          isDefaultBillingAddress:
            checkout.shippingAddress?.isDefaultBillingAddress,
          isDefaultShippingAddress:
            checkout.shippingAddress?.isDefaultShippingAddress,
        };

  const result_billingAddress: ICheckoutAddress =
    target !== "Billing"
      ? checkout.billingAddress!
      : {
          id: addressObject.id,
          firstName: addressObject.first_name,
          lastName: addressObject.last_name,
          companyName: addressObject.company_name,
          streetAddress1: addressObject.street_address_1,
          streetAddress2: addressObject.street_address_2,
          city: addressObject.city,
          postalCode: addressObject.postal_code,
          countryArea: addressObject.country_area,
          phone: addressObject.phone,
          country: {
            code: addressObject.country,
            country: "Japan",
          },
          isDefaultBillingAddress:
            checkout.billingAddress?.isDefaultBillingAddress,
          isDefaultShippingAddress:
            checkout.billingAddress?.isDefaultShippingAddress,
        };

  // TODO : 後、Coupon Or Voucher処理する時必要
  // const result_promoCodeDiscount_discount: ICheckoutModelPriceValue = {
  //   amount: checkout.promoCodeDiscount?.discount?.amount!,
  //   currency: checkout.promoCodeDiscount?.discount?.currency!,
  // }

  // const result_promoCodeDiscount: ICheckoutModelPromoCodeDiscount = {
  //   voucherCode: checkout.promoCodeDiscount?.voucherCode,
  //   discount: result_promoCodeDiscount_discount,
  //   discountName: checkout.promoCodeDiscount?.discountName
  // }

  const result: ICheckoutModel = {
    id: checkout.id,
    token: checkout.token,
    email: checkout.email,
    shippingAddress: result_shippingAddress,
    billingAddress: result_billingAddress,
    selectedShippingAddressId: checkout.selectedBillingAddressId,
    selectedBillingAddressId: checkout.selectedShippingAddressId,
    billingAsShipping: checkout.billingAsShipping,
    promoCodeDiscount: checkout.promoCodeDiscount,
    lines: checkout.lines,
    availableShippingMethods: checkout.availableShippingMethods,
    availablePaymentGateways: checkout.availablePaymentGateways,
    shippingMethod: checkout.shippingMethod,
  };

  return result;
};

export const updateCheckoutEmailVariablesConvert = (
  token: string,
  email: string
) => {
  const result: Update_checkout_checkout_variables_email = {
    email,
    token,
  };

  return result;
};

export const createCheckoutVariablesConvert = (
  email: string,
  shippingAddress?: ICheckoutAddress,
  combinationLines?: CombinationLinesType[]
) => {
  const checkoutToken = uuidv4();

  const checkoutObject: CreateCheckout_checkout_checkout_variables_checkoutObject = {
    email,
    metadata: {},
    billing_address_id: null,
    private_metadata: "",
    quantity: combinationLines?.reduce(
      (accumulatorPrice, line) => accumulatorPrice + (line.quantity || 0),
      0
    )!,
    country: "JP",
    shipping_address_id: decoderOfRelayId(shippingAddress?.id!),
    token: checkoutToken,
    currency: "JPY",
    note: "",
    discount_amount: 0,
    shipping_method_id: null,
    discount_name: null,
    redirect_url: null,
    translated_discount_name: null,
    checkout_checkoutlines: {
      data: combinationLines!,
    },
    voucher_code: null,
    tracking_code: null,
  };

  const variables: CreateCheckout_checkout_checkout_variables = {
    checkoutObject,
  };

  return variables;
};

export const createAddressVariablesConvert = (
  addressInfo?: ICheckoutAddress
) => {
  const variables_addressObject: Set_address_address_variables_addressObject = {
    first_name: addressInfo?.firstName,
    last_name: addressInfo?.lastName,
    country: addressInfo?.country?.code,
    phone: addressInfo?.phone,
    postal_code: addressInfo?.postalCode,
    street_address_1: addressInfo?.streetAddress1,
    street_address_2: addressInfo?.streetAddress2,
    country_area: addressInfo?.countryArea,
    company_name: addressInfo?.companyName,
    city_area: "",
    city: addressInfo?.city,
  };

  const variables: Create_address_address_variables = {
    addressObject: variables_addressObject,
  };

  return variables;
};

export const createCheckoutDataModelConvert = (
  email: string,
  lines?: ICheckoutModelLine[],
  resultAddress?: resultAddressType,
  resultCheckout?: resultCheckoutType,
  resultShippingMethod?: resultShippingMethodsType | null
) => {
  const result_shippingAddress: Checkout_shippingAddress = {
    firstName: resultAddress!?.first_name,
    companyName: resultAddress!?.company_name,
    id: resultAddress!?.id,
    lastName: resultAddress!?.last_name,
    city: resultAddress!?.city,
    streetAddress1: resultAddress!?.street_address_1,
    country: {
      code: resultAddress!?.country,
      country: "Japan",
    },
    streetAddress2: resultAddress!?.street_address_2,
    countryArea: resultAddress!?.country_area,
    postalCode: resultAddress!?.postal_code,
    isDefaultBillingAddress: null,
    isDefaultShippingAddress: null,
    phone: resultAddress!?.phone,
  };

  const result_discount: Checkout_discount = {
    currency: "JPY",
    amount: 0,
  };

  const result_shippingPrice: Checkout_shippingPrice = {
    gross: {
      amount: 0,
      currency: "JPY",
    },
    net: {
      amount: 0,
      currency: "JPY",
    },
  };

  const result: Checkout = {
    billingAddress: null,
    id: resultCheckout!?.id,
    availableShippingMethods: resultShippingMethod!?.availableShippingMethods,
    token: resultCheckout?.token,
    email,
    shippingAddress: result_shippingAddress,
    shippingMethod: null,
    discount: result_discount,
    isShippingRequired: true,
    lines: lines!,
    shippingPrice: result_shippingPrice,
    discountName: null,
    translatedDiscountName: null,
    availablePaymentGateways: [],
    voucherCode: null,
  };

  return result;
};

export const setTargetCheckoutConvert = (
  token: string,
  id: number,
  lastChange: Date
) => {
  const variables: Set_Target_Checkout_Variables = {
    token,
    id,
    lastChange,
  };

  return variables;
};

export const addPromoCodeVariablesConvert = (
  promoCode: SelectPromoValue,
  checkout: ICheckoutModel
) => {
  let discountAmt = 0;

  if (promoCode.discount_value_type === "percentage") {
    discountAmt =
      (checkout.shippingMethod?.price!?.amount * promoCode.discount_value) /
      100;
  }

  const variables: AddPromoCode_discount_voucher_Variables = {
    token: checkout.token,
    lastChange: new Date(),
    currency: promoCode.currency,
    discountAmt,
    discountName: promoCode.name,
    voucherCode: promoCode.code,
    translatedDiscountName: "",
  };

  return variables;
};
