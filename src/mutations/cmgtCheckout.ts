import gql from "graphql-tag";

export const createAddressMutationRelay = gql`
  mutation addAddress($addressObject: [account_address_insert_input!]!) {
    insert_account_address(objects: $addressObject) {
      affected_rows
      returning {
        id
        first_name
        last_name
        country
        phone
        postal_code
        street_address_1
        street_address_2
        country_area
        company_name
        city_area
        city
      }
    }
  }
`;

export const createCheckoutRelay = gql`
  mutation createCheckout($checkoutObject: [checkout_checkout_insert_input!]!) {
    insert_checkout_checkout(objects: $checkoutObject) {
      affected_rows
      returning {
        id
        email
        token
        checkout_checkoutlines {
          id
          checkout_id
          variant_id
          saleproduct_id
        }
      }
    }
  }
`;

export const updateBillingAddressHasura = gql`
  mutation updateBillingAddress(
    $token: uuid
    $billingAddressId: Int
    $lastChange: timestamptz
  ) {
    update_checkout_checkout(
      where: { token: { _eq: $token } }
      _set: { billing_address_id: $billingAddressId, last_change: $lastChange }
    ) {
      affected_rows
      returning {
        token
        email
        billing_address_id
      }
    }
  }
`;
export const updateCheckoutShippingMethodHasura = gql`
  mutation updateCheckoutShippingMethod(
    $token: uuid
    $shippingMethodId: Int
    $lastChange: timestamptz
  ) {
    update_checkout_checkout(
      where: { token: { _eq: $token } }
      _set: { last_change: $lastChange, shipping_method_id: $shippingMethodId }
    ) {
      affected_rows
      returning {
        token
        email
        shipping_method_id
      }
    }
  }
`;

export const updateCheckoutDiscount = gql`
  mutation updateCheckoutDiscount(
    $token: uuid
    $lastChange: timestamptz
    $currency: String
    $discountAmt: numeric
    $discountName: String
    $voucherCode: String
    $translatedDiscountName: String
  ) {
    update_checkout_checkout(
      where: { token: { _eq: $token } }
      _set: {
        last_change: $lastChange
        currency: $currency
        discount_amount: $discountAmt
        discount_name: $discountName
        voucher_code: $voucherCode
        translated_discount_name: $translatedDiscountName
      }
    ) {
      affected_rows
      returning {
        token
        currency
        discount_amount
        discount_name
        last_change
        translated_discount_name
        voucher_code
      }
    }
  }
`;

export const updatePaymentActive = gql`
  mutation updatePaymentActive($token: uuid) {
    update_payment_payment(
      where: { checkout_id: { _eq: $token } }
      _set: { is_active: false }
    ) {
      affected_rows
    }
  }
`;
export const createPaymentRelay = gql`
  mutation createPayment($paymentObject: [payment_payment_insert_input!]!) {
    insert_payment_payment(objects: $paymentObject) {
      affected_rows
      returning {
        gateway
        id
        token
        total
        currency
      }
    }
  }
`;

export const updaChekcoutTrackingCode = gql`
  mutation updaChekcoutTrackingCode(
    $token: uuid
    $trackingCode: String
    $lastChange: timestamptz
  ) {
    update_checkout_checkout(
      where: { token: { _eq: $token } }
      _set: { tracking_code: $trackingCode, last_change: $lastChange }
    ) {
      affected_rows
      returning {
        tracking_code
      }
    }
  }
`;

export const insertPaymentTransaction = gql`
  mutation insertPaymentTransaction(
    $paymentTranObject: [payment_transaction_insert_input!]!
  ) {
    insert_payment_transaction(objects: $paymentTranObject) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

export const updatePaymentResult = gql`
  mutation updatePaymentCardInfo(
    $paymentId: Int
    $cardBrand: String
    $cardMonth: Int
    $cardYear: Int
    $paymentMethodType: String
    $modified: timestamptz
    $charge_status: String
    $capturedAmt: numeric
  ) {
    update_payment_payment(
      where: { id: { _eq: $paymentId } }
      _set: {
        cc_brand: $cardBrand
        cc_exp_month: $cardMonth
        cc_exp_year: $cardYear
        payment_method_type: $paymentMethodType
        modified: $modified
        charge_status: $charge_status
        captured_amount: $capturedAmt
      }
    ) {
      affected_rows
    }
  }
`;

export const updatePaymentTransaction = gql`
  mutation updatePaymentTransaction($paymentTranId: Int) {
    update_payment_transaction(
      where: { id: { _eq: $paymentTranId } }
      _set: { already_processed: true }
    ) {
      affected_rows
    }
  }
`;

export const updateDiscountVoucherUsed = gql`
  mutation updateDiscountVoucherUsed($code: String_comparison_exp) {
    update_discount_voucher(where: { code: $code }, _set: { used: 1 }) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

export const insertOrder = gql`
  mutation insertOrder($orderObject: [order_order_insert_input!]!) {
    insert_order_order(objects: $orderObject) {
      affected_rows
      returning {
        id
        token
      }
    }
  }
`;

export const updatePaymentOrderId = gql`
  mutation updatePaymentOrderId($orderId: Int, $checkoutId: uuid) {
    update_payment_payment(
      where: { checkout_id: { _eq: $checkoutId } }
      _set: { order_id: $orderId }
    ) {
      affected_rows
    }
  }
`;

export const deleteCheckoutlineAndGift = gql`
  mutation deleteCheckoutlineAndGift($checkoutId: uuid) {
    delete_checkout_checkout_gift_cards(
      where: { checkout_id: { _eq: $checkoutId } }
    ) {
      affected_rows
    }
    delete_checkout_checkoutline(where: { checkout_id: { _eq: $checkoutId } }) {
      affected_rows
    }
  }
`;

export const deleteCheckoutGiftCard = gql`
  mutation deleteCheckoutGiftCard($checkoutId: uuid) {
    delete_checkout_checkout_gift_cards(
      where: { checkout_id: { _eq: $checkoutId } }
    ) {
      affected_rows
    }
  }
`;

export const deleteCheckoutline = gql`
  mutation deleteCheckoutline($checkoutId: uuid) {
    delete_checkout_checkoutline(where: { checkout_id: { _eq: $checkoutId } }) {
      affected_rows
    }
  }
`;

export const deleteCheckout = gql`
  mutation deleteCheckout($token: uuid) {
    delete_checkout_checkout(where: { token: { _eq: $token } }) {
      affected_rows
    }
  }
`;

export const updatePaymentExceptCheckout = gql`
  mutation updatePaymentExceptCheckout($paymentIds: [Int!]!) {
    update_payment_payment(
      where: { id: { _in: $paymentIds } }
      _set: { checkout_id: null }
    ) {
      affected_rows
    }
  }
`;

export const insertOrderEvent = gql`
  mutation insertOrderEvent(
    $orderEventObject: [order_orderevent_insert_input!]!
  ) {
    insert_order_orderevent(objects: $orderEventObject) {
      affected_rows
    }
  }
`;

export const selectUserAddress = gql`
  query selectUserAddress($user_id: Int) {
    account_user_connection(where: { id: { _eq: $user_id } }) {
      edges {
        node {
          id
          email
          first_name
          last_name
          is_staff
          accountAddressByDefaultShippingAddressId {
            id
            first_name
            last_name
            company_name
            street_address_1
            street_address_2
            city
            postal_code
            country
            country_area
            phone
          }
          accountAddressByDefaultBillingAddressId {
            id
            first_name
            last_name
            company_name
            street_address_1
            street_address_2
            city
            postal_code
            country
            country_area
            phone
          }
          account_user_addresses {
            account_address {
              id
              first_name
              last_name
              company_name
              street_address_1
              street_address_2
              city
              postal_code
              country
              country_area
              phone
            }
          }
        }
      }
    }
  }
`;

export const updateAddress = gql`
  mutation updateAddress(
    $addressId: Int
    $addressObject: account_address_set_input
  ) {
    update_account_address(
      where: { id: { _eq: $addressId } }
      _set: $addressObject
    ) {
      affected_rows
    }
  }
`;

export const updateUserAddress = gql`
  mutation updateUserAddress(
    $addressId: Int
    $addressObject: account_address_set_input
  ) {
    update_account_address(
      where: { id: { _eq: $addressId } }
      _set: $addressObject
    ) {
      affected_rows
      returning {
        id
        first_name
        last_name
        country_area
        country
        company_name
        city_area
        city
        phone
        postal_code
        street_address_1
        street_address_2
      }
    }
  }
`;

export const updateCheckoutEmail = gql`
  mutation updateCheckoutEmail($token: uuid, $email: String) {
    update_checkout_checkout(
      where: { token: { _eq: $token } }
      _set: { email: $email }
    ) {
      affected_rows
    }
  }
`;
