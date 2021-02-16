/* eslint-disable prettier/prettier */

import { decoderOfRelayId } from "../utils";

import {
  ICheckoutAddress,
  ICheckoutModel,
  // ICheckoutModelPromoCodeDiscount,
  // ICheckoutModelPriceValue,
  // ICheckoutModelLine
} from "../helpers/LocalStorageHandler";
import {
  Update_address_address_variables,
  Update_address_address_variables_addressObject,
  Update_checkout_checkout_variables_email,
} from "../mutations/gqlTypes/CmgtCheckoutAddress";

export const updateAddressVariablesConvert = (
  addressObject: ICheckoutAddress,
  shippingId: string
) => {
  const variables_addressObject: Update_address_address_variables_addressObject = {
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
  addressObject: Update_address_address_variables_addressObject,
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
