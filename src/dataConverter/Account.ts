/* eslint-disable prettier/prettier */

import { decoderOfRelayId, encodeId } from "../utils";

import { CmgtAccountUpdate_update_account_user } from "../mutations/gqlTypes/CmgtAccountUpdate";

import {
  // AccountUpdate_accountUpdate_errors,
  AccountUpdate_accountUpdate_user_defaultShippingAddress_country,
  AccountUpdate_accountUpdate_user_defaultShippingAddress,
  AccountUpdate_accountUpdate_user_defaultBillingAddress_country,
  AccountUpdate_accountUpdate_user_defaultBillingAddress,
  AccountUpdate_accountUpdate_user_addresses_country,
  AccountUpdate_accountUpdate_user_addresses,
  AccountUpdate_accountUpdate_user,
  AccountUpdate_accountUpdate,
  AccountUpdate,
} from "../mutations/gqlTypes/AccountUpdate";

export const updateAccountUserVariantsResponse = (
  CmgtSetAccountUpdateVariants: CmgtAccountUpdate_update_account_user | null
) => {
  const userInfo = CmgtSetAccountUpdateVariants?.returning[0];
  const defaultShipping = userInfo?.accountAddressByDefaultShippingAddressId;
  const defaultBilling = userInfo?.accountAddressByDefaultBillingAddressId;

  // const errorVariants: AccountUpdate_accountUpdate_errors = {
  //   __typename: "AccountError",
  //   code: "",
  //   field: "",
  //   message: "",
  // };

  const defaultShippingAddressCountry: AccountUpdate_accountUpdate_user_defaultShippingAddress_country = {
    __typename: "CountryDisplay",
    code: "",
    country: defaultShipping?.country || "",
  };

  const defaultShippingAddressVariants: AccountUpdate_accountUpdate_user_defaultShippingAddress = {
    __typename: "Address",
    id: defaultShipping?.id || "",
    firstName: defaultShipping?.first_name || "",
    lastName: defaultShipping?.last_name || "",
    companyName: defaultShipping?.company_name || "",
    streetAddress1: defaultShipping?.street_address_1 || "",
    streetAddress2: defaultShipping?.street_address_2 || "",
    city: defaultShipping?.city || "",
    postalCode: defaultShipping?.postal_code || "",
    country: defaultShippingAddressCountry,
    countryArea: defaultShipping?.country_area || "",
    phone: defaultShipping?.phone || "",
    isDefaultBillingAddress: false,
    isDefaultShippingAddress: true,
  };

  const defaultBillingAddressCountry: AccountUpdate_accountUpdate_user_defaultBillingAddress_country = {
    __typename: "CountryDisplay",
    code: "",
    country: defaultShipping?.country || "",
  };

  const defaultBillingAddressVariants: AccountUpdate_accountUpdate_user_defaultBillingAddress = {
    __typename: "Address",
    id: defaultBilling?.id || "",
    firstName: defaultBilling?.first_name || "",
    lastName: defaultBilling?.last_name || "",
    companyName: defaultBilling?.company_name || "",
    streetAddress1: defaultBilling?.street_address_1 || "",
    streetAddress2: defaultBilling?.street_address_2 || "",
    city: defaultBilling?.city || "",
    postalCode: defaultBilling?.postal_code || "",
    country: defaultBillingAddressCountry,
    countryArea: defaultBilling?.country_area || "",
    phone: defaultBilling?.phone || "",
    isDefaultBillingAddress: true,
    isDefaultShippingAddress: false,
  };

  const addressesVariants = userInfo?.account_user_addresses.map(value => {
    const { account_address } = value;

    const isDefaultBilling = defaultShipping
      ? defaultShipping.id === account_address.id
      : false;
    const isDefaultShipping = defaultBilling
      ? defaultBilling.id === account_address.id
      : false;

    const addressesCountry: AccountUpdate_accountUpdate_user_addresses_country = {
      __typename: "CountryDisplay",
      code: "",
      country: account_address.country,
    };

    const addresses: AccountUpdate_accountUpdate_user_addresses = {
      __typename: "Address",
      id: account_address.id,
      firstName: account_address.first_name,
      lastName: account_address.last_name,
      companyName: account_address.company_name,
      streetAddress1: account_address.street_address_1,
      streetAddress2: account_address.street_address_2,
      city: account_address.city,
      postalCode: account_address.postal_code,
      country: addressesCountry,
      countryArea: account_address.country_area,
      phone: account_address.phone,
      isDefaultBillingAddress: isDefaultBilling,
      isDefaultShippingAddress: isDefaultShipping,
    };

    return addresses;
  });

  const userId = decoderOfRelayId(userInfo?.id || "");
  const variantUserId = encodeId(String(userId), "User");

  const userVariants: AccountUpdate_accountUpdate_user = {
    __typename: "User",
    id: variantUserId || "",
    email: userInfo?.email || "",
    firstName: userInfo?.first_name || "",
    lastName: userInfo?.last_name || "",
    isStaff: userInfo?.is_staff || false,
    defaultShippingAddress: defaultShipping
      ? defaultShippingAddressVariants
      : null,
    defaultBillingAddress: defaultShipping
      ? defaultBillingAddressVariants
      : null,
    addresses: addressesVariants || null,
  };

  const accountUpdateVariants: AccountUpdate_accountUpdate = {
    __typename: "AccountUpdate",
    errors: [],
    user: userVariants,
  };

  const AccountUpdateVariants: AccountUpdate = {
    accountUpdate: accountUpdateVariants,
  };

  return AccountUpdateVariants;
};
