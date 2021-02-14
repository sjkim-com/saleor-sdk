import {
  DataErrorCheckoutTypes,
  FunctionErrorCheckoutTypes,
} from "../../api/Checkout/types";
import { ApolloClientManager } from "../../data/ApolloClientManager";
import { LocalStorageHandler } from "../../helpers/LocalStorageHandler";
import { JobRunResponse } from "../types";
import {
  CompleteCheckoutJobInput,
  CreatePaymentJobInput,
  RemovePromoCodeJobInput,
  AddPromoCodeJobInput,
  SetShippingMethodJobInput,
  ProvideCheckoutJobInput,
  CreateCheckoutJobInput,
  SetShippingAddressJobInput,
  SetBillingAddressJobInput,
  SetBillingAddressWithEmailJobInput,
} from "./types";

import {
  CreateCheckoutJobInput_Relay,
  SetShippingMethodJobRelayInput,
  cardValue,
} from "./typesRelay";
import { JobsHandler } from "../JobsHandler";
import { decoderOfRelayId } from "../../utils";

export type PromiseCheckoutJobRunResponse = Promise<
  JobRunResponse<DataErrorCheckoutTypes, FunctionErrorCheckoutTypes>
>;

class CheckoutJobs extends JobsHandler<{}> {
  private apolloClientManager: ApolloClientManager;

  private localStorageHandler: LocalStorageHandler;

  constructor(
    localStorageHandler: LocalStorageHandler,
    apolloClientManager: ApolloClientManager
  ) {
    super();
    this.apolloClientManager = apolloClientManager;
    this.localStorageHandler = localStorageHandler;
  }

  provideCheckout = async ({
    isUserSignedIn,
    channel,
  }: ProvideCheckoutJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = LocalStorageHandler.getCheckout();

    const { data, error } = await this.apolloClientManager.getCheckout(
      isUserSignedIn,
      channel,
      checkout?.token
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.GET_CHECKOUT,
        },
      };
    }
    this.localStorageHandler.setCheckout(data || checkout);

    return {
      data,
    };
  };

  createCheckout = async ({
    email,
    lines,
    channel,
    shippingAddress,
    selectedShippingAddressId,
    billingAddress,
    selectedBillingAddressId,
  }: CreateCheckoutJobInput): PromiseCheckoutJobRunResponse => {
    const { data, error } = await this.apolloClientManager.createCheckout(
      email,
      lines,
      channel,
      shippingAddress,
      billingAddress
    );

    if (error) {
      /**
       * TODO: Differentiate errors!!! THIS IS A BUG!!!
       * DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS is just one of every possible - instead of deprecated errors, checkoutErrors should be used.
       */
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS,
        },
      };
    }

    this.localStorageHandler.setCheckout({
      ...data,
      selectedBillingAddressId,
      selectedShippingAddressId,
    });
    return {
      data,
    };
  };

  cmgtCreateCheckout = async ({
    email,
    lines,
    // channel,
    selectedShippingAddressId,
    shippingAddress,
    billingAddress,
    selectedBillingAddressId,
  }: CreateCheckoutJobInput_Relay): PromiseCheckoutJobRunResponse => {
    const { data, error } = await this.apolloClientManager.cmgtCreateAddress(
      shippingAddress
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS,
        },
      };
    }

    const combinationLines = lines.map(line => ({
      quantity: line.quantity,
      variant_id: decoderOfRelayId(line.variant.id),
      data: {},
    }));

    const {
      checkoutData,
      checkoutError,
    } = await this.apolloClientManager.cmgtCreateCheckout(
      email,
      data,
      combinationLines
    );

    if (checkoutError) {
      return {
        dataError: {
          error: checkoutError,
          type: DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS,
        },
      };
    }

    const {
      shippingMethodData,
      shippingMethodError,
    } = await this.apolloClientManager.cmgtSelectShippingMethodList(
      "JP",
      lines
    );

    if (shippingMethodError) {
      return {
        dataError: {
          error: shippingMethodError,
          type: DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS,
        },
      };
    }
    const {
      resultData,
    } = await this.apolloClientManager.cmgtDataReconstruction(
      email,
      lines,
      data,
      checkoutData,
      shippingMethodData
    );

    this.localStorageHandler.setCheckout({
      ...resultData,
      selectedBillingAddressId,
      selectedShippingAddressId: resultData.shippingAddress?.id,
    });
    return {
      data: resultData,
    };
  };

  setShippingAddress = async ({
    checkoutId,
    shippingAddress,
    email,
    selectedShippingAddressId,
    channel,
  }: SetShippingAddressJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = LocalStorageHandler.getCheckout();

    const { data, error } = await this.apolloClientManager.setShippingAddress(
      shippingAddress,
      email,
      checkoutId,
      channel
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS,
        },
      };
    }

    this.localStorageHandler.setCheckout({
      ...checkout,
      availableShippingMethods: data?.availableShippingMethods,
      billingAsShipping: false,
      email: data?.email,
      selectedShippingAddressId,
      shippingAddress: data?.shippingAddress,
    });
    return { data };
  };

  setBillingAddress = async ({
    checkoutId,
    billingAddress,
    billingAsShipping,
    selectedBillingAddressId,
  }: SetBillingAddressJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = LocalStorageHandler.getCheckout();

    const { data, error } = await this.apolloClientManager.setBillingAddress(
      billingAddress,
      checkoutId
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_BILLING_ADDRESS,
        },
      };
    }

    this.localStorageHandler.setCheckout({
      ...checkout,
      availablePaymentGateways: data?.availablePaymentGateways,
      billingAddress: data?.billingAddress,
      billingAsShipping: !!billingAsShipping,
      selectedBillingAddressId,
    });
    return { data };
  };

  cmgtSetBillingAddress = async ({
    checkoutId,
    billingAddress,
    billingAsShipping,
    selectedBillingAddressId,
    token,
  }: SetBillingAddressJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = LocalStorageHandler.getCheckout();
    const {
      billingData,
      billingError,
    } = await this.apolloClientManager.cmgtSetBillingAddress(
      billingAddress,
      checkoutId
    );

    if (billingError) {
      return {
        dataError: {
          error: billingError,
          type: DataErrorCheckoutTypes.SET_BILLING_ADDRESS,
        },
      };
    }

    const {
      checkoutBillingData,
      checkoutBillingError,
    } = await this.apolloClientManager.cmgtUpdateCheckoutBillingAddress(
      billingData,
      checkout!,
      token!
    );

    if (checkoutBillingError) {
      return {
        dataError: {
          error: checkoutBillingError,
          type: DataErrorCheckoutTypes.SET_BILLING_ADDRESS,
        },
      };
    }

    this.localStorageHandler.setCheckout({
      ...checkout,
      availablePaymentGateways: checkoutBillingData?.availablePaymentGateways,
      billingAddress: checkoutBillingData?.billingAddress,
      billingAsShipping: !!billingAsShipping,
      selectedBillingAddressId,
    });
    return { data: checkoutBillingData };
  };

  setBillingAddressWithEmail = async ({
    checkoutId,
    email,
    billingAddress,
    selectedBillingAddressId,
  }: SetBillingAddressWithEmailJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = LocalStorageHandler.getCheckout();

    const {
      data,
      error,
    } = await this.apolloClientManager.setBillingAddressWithEmail(
      billingAddress,
      email,
      checkoutId
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_BILLING_ADDRESS,
        },
      };
    }

    this.localStorageHandler.setCheckout({
      ...checkout,
      availablePaymentGateways: data?.availablePaymentGateways,
      billingAddress: data?.billingAddress,
      billingAsShipping: false,
      email: data?.email,
      selectedBillingAddressId,
    });
    return { data };
  };

  setShippingMethod = async ({
    checkoutId,
    shippingMethodId,
  }: SetShippingMethodJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = LocalStorageHandler.getCheckout();

    const { data, error } = await this.apolloClientManager.setShippingMethod(
      shippingMethodId,
      checkoutId
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_SHIPPING_METHOD,
        },
      };
    }

    this.localStorageHandler.setCheckout({
      ...checkout,
      promoCodeDiscount: data?.promoCodeDiscount,
      shippingMethod: data?.shippingMethod,
    });
    return { data };
  };

  cmgtSetShippingMethod = async ({
    checkoutToken,
    selectShippingMethod,
  }: SetShippingMethodJobRelayInput): PromiseCheckoutJobRunResponse => {
    const checkout = LocalStorageHandler.getCheckout();

    const {
      shippingMethodData,
      shippingMethodError,
    } = await this.apolloClientManager.cmgtSetShippingMethod(
      selectShippingMethod,
      checkoutToken,
      checkout!
    );

    if (shippingMethodError) {
      return {
        dataError: {
          error: shippingMethodError,
          type: DataErrorCheckoutTypes.SET_SHIPPING_METHOD,
        },
      };
    }

    this.localStorageHandler.setCheckout({
      ...checkout,
      promoCodeDiscount: shippingMethodData?.promoCodeDiscount,
      shippingMethod: shippingMethodData?.shippingMethod,
    });
    return { data: shippingMethodData };
  };

  addPromoCode = async ({
    checkoutId,
    promoCode,
  }: AddPromoCodeJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = LocalStorageHandler.getCheckout();

    const { data, error } = await this.apolloClientManager.addPromoCode(
      promoCode,
      checkoutId
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.ADD_PROMO_CODE,
        },
      };
    }

    this.localStorageHandler.setCheckout({
      ...checkout,
      promoCodeDiscount: data?.promoCodeDiscount,
    });
    return { data };
  };

  cmgtAddPromoCode = async ({
    checkoutId,
    promoCode,
  }: AddPromoCodeJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = LocalStorageHandler.getCheckout();

    const {
      selectPromoData,
      selectPromoError,
    } = await this.apolloClientManager.selectPromoCode(promoCode);

    if (selectPromoError) {
      return {
        dataError: {
          error: selectPromoError,
          type: DataErrorCheckoutTypes.ADD_PROMO_CODE,
        },
      };
    }

    // TODO: 조건 판단처리

    const { data, error } = await this.apolloClientManager.cmgtAddPromoCode(
      selectPromoData,
      checkout!
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.ADD_PROMO_CODE,
        },
      };
    }

    this.localStorageHandler.setCheckout({
      ...checkout,
      promoCodeDiscount: data?.promoCodeDiscount,
    });
    return { data };
  };

  removePromoCode = async ({
    checkoutId,
    promoCode,
  }: RemovePromoCodeJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = LocalStorageHandler.getCheckout();

    const { data, error } = await this.apolloClientManager.removePromoCode(
      promoCode,
      checkoutId
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.REMOVE_PROMO_CODE,
        },
      };
    }

    this.localStorageHandler.setCheckout({
      ...checkout,
      promoCodeDiscount: data?.promoCodeDiscount,
    });
    return { data };
  };

  createPayment = async ({
    checkoutId,
    amount,
    gateway,
    token,
    creditCard,
    returnUrl,
  }: CreatePaymentJobInput): PromiseCheckoutJobRunResponse => {
    const payment = LocalStorageHandler.getPayment();

    const { data, error } = await this.apolloClientManager.createPayment({
      amount,
      checkoutId,
      gateway,
      returnUrl,
      token,
    });

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.CREATE_PAYMENT,
        },
      };
    }

    this.localStorageHandler.setPayment({
      ...payment,
      creditCard,
      gateway: data?.gateway,
      id: data?.id,
      token: data?.token,
      total: data?.total,
    });
    return { data };
  };

  cmgtCreatePayment = async ({
    checkoutId,
    amount,
    gateway,
    token,
    creditCard,
    returnUrl,
  }: CreatePaymentJobInput): PromiseCheckoutJobRunResponse => {
    const payment = LocalStorageHandler.getPayment();
    const checkout = LocalStorageHandler.getCheckout();
    const checkoutToken = checkout?.token;
    const {
      existPaymentError,
    } = await this.apolloClientManager.cmgtExistPayment(checkoutToken);

    if (existPaymentError) {
      return {
        dataError: {
          error: existPaymentError,
          type: DataErrorCheckoutTypes.CREATE_PAYMENT,
        },
      };
    }
    const { data, error } = await this.apolloClientManager.cmgtCreatePayment({
      amount,
      checkout,
      gateway,
      returnUrl,
      token,
    });

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.CREATE_PAYMENT,
        },
      };
    }

    this.localStorageHandler.setPayment({
      ...payment,
      creditCard,
      gateway: data?.gateway,
      id: data?.id,
      token: data?.token,
      total: data?.total,
    });
    return { data };
  };

  completeCheckout = async ({
    checkoutId,
    paymentData,
    redirectUrl,
    storeSource,
  }: CompleteCheckoutJobInput): PromiseCheckoutJobRunResponse => {
    const { data, error } = await this.apolloClientManager.completeCheckout({
      checkoutId,
      paymentData,
      redirectUrl,
      storeSource,
    });

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.COMPLETE_CHECKOUT,
        },
      };
    }

    if (!data?.confirmationNeeded) {
      this.localStorageHandler.setCheckout({});
      this.localStorageHandler.setPayment({});
    }

    return { data };
  };

  cmgtCompleteCheckout = async ({
    checkoutId,
    paymentData,
    redirectUrl,
    storeSource,
  }: CompleteCheckoutJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = LocalStorageHandler.getCheckout();
    const promoCode = checkout?.promoCodeDiscount?.voucherCode;
    const checkoutToken = checkout?.token;
    const {
      trackingData,
      trackingError,
    } = await this.apolloClientManager.cmgtUpdaChekcoutTrackingCode(
      checkoutToken
    );

    if (trackingError) {
      return {
        dataError: {
          error: trackingError,
          type: DataErrorCheckoutTypes.COMPLETE_CHECKOUT,
        },
      };
    }

    const {
      DiscountVoucherData,
      DiscountVoucherError,
    } = await this.apolloClientManager.cmgtUpdateDiscountVoucherUsed(
      promoCode!
    );

    if (DiscountVoucherError) {
      return {
        dataError: {
          error: DiscountVoucherError,
          type: DataErrorCheckoutTypes.COMPLETE_CHECKOUT,
        },
      };
    }

    const {
      PaymentTranData,
      PaymentTranError,
    } = await this.apolloClientManager.cmgtInsertPaymentTransaction(
      paymentData!
    );

    if (PaymentTranError) {
      return {
        dataError: {
          error: PaymentTranError,
          type: DataErrorCheckoutTypes.COMPLETE_CHECKOUT,
        },
      };
    }

    // TODO: GMO CARD
    const cardInfo: cardValue = {
      cardNo: "4444-1111-1111-1111",
      cvc: 1234,
      brand: "dummy_visa",
      year: 2222,
      month: 12,
    };

    const {
      PaymentResultData,
      PaymentResultError,
    } = await this.apolloClientManager.cmgtUpdatePaymentResult(
      paymentData!,
      cardInfo
    );

    if (PaymentResultError) {
      return {
        dataError: {
          error: PaymentTranError,
          type: DataErrorCheckoutTypes.COMPLETE_CHECKOUT,
        },
      };
    }

    let confirmationNeeded = true;

    // TODO: 결제 진행 완료 GMO 처리
    if (PaymentResultData) {
      confirmationNeeded = false;
    }

    const {
      UpdatePaymentTranData,
      UpdatePaymentTranError,
    } = await this.apolloClientManager.cmgtUpdatePaymentTransaction(
      PaymentTranData!
    );

    if (UpdatePaymentTranError) {
      return {
        dataError: {
          error: PaymentTranError,
          type: DataErrorCheckoutTypes.COMPLETE_CHECKOUT,
        },
      };
    }

    if (UpdatePaymentTranData) {
      const {
        orderData,
        orderError,
      } = await this.apolloClientManager.cmgtInsertOrder(
        trackingData.tracking_code,
        PaymentTranData!,
        DiscountVoucherData!,
        checkout!,
        paymentData!
      );

      if (orderError) {
        return {
          dataError: {
            error: orderError,
            type: DataErrorCheckoutTypes.COMPLETE_CHECKOUT,
          },
        };
      }
      const {
        updatePaymentOrderError,
      } = await this.apolloClientManager.cmgtUpdatePaymentOrderId(
        orderData!,
        checkoutToken
      );

      if (updatePaymentOrderError) {
        return {
          dataError: {
            error: updatePaymentOrderError,
            type: DataErrorCheckoutTypes.COMPLETE_CHECKOUT,
          },
        };
      }
      const {
        deleteCheckoutlineAndGiftError,
      } = await this.apolloClientManager.cmgtDeleteCheckoutlineAndGift(
        checkoutToken
      );

      if (deleteCheckoutlineAndGiftError) {
        return {
          dataError: {
            error: deleteCheckoutlineAndGiftError,
            type: DataErrorCheckoutTypes.COMPLETE_CHECKOUT,
          },
        };
      }
      const {
        selecPaymentData,
        selecPaymentError,
      } = await this.apolloClientManager.cmgtSelectPayemntIncludeCheckout(
        checkoutToken
      );

      if (selecPaymentError) {
        return {
          dataError: {
            error: selecPaymentError,
            type: DataErrorCheckoutTypes.COMPLETE_CHECKOUT,
          },
        };
      }
      const {
        exceptChekcoutError,
      } = await this.apolloClientManager.cmgtUpdatePaymentExceptCheckout(
        selecPaymentData!
      );

      if (exceptChekcoutError) {
        return {
          dataError: {
            error: exceptChekcoutError,
            type: DataErrorCheckoutTypes.COMPLETE_CHECKOUT,
          },
        };
      }
      const {
        deleteCheckoutError,
      } = await this.apolloClientManager.cmgtDeleteCheckout(checkoutToken);

      if (deleteCheckoutError) {
        return {
          dataError: {
            error: deleteCheckoutError,
            type: DataErrorCheckoutTypes.COMPLETE_CHECKOUT,
          },
        };
      }
    }

    if (!confirmationNeeded) {
      this.localStorageHandler.setCheckout({});
      this.localStorageHandler.setPayment({});
    }

    return {};
  };
}

export default CheckoutJobs;
