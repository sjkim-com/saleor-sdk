import { ICreditCard } from "../../api/Checkout/types";
import {
  ICheckoutAddress,
  ICheckoutModelLine,
} from "../../helpers/LocalStorageHandler";

export interface ProvideCheckoutJobInput {
  isUserSignedIn: boolean;
  channel: string;
}

export interface CreateCheckoutJobInput_Relay {
  email: string;
  lines: ICheckoutModelLine[];
  selectedShippingAddressId?: string;
  shippingAddress?: ICheckoutAddress;
  billingAddress?: ICheckoutAddress;
  selectedBillingAddressId?: string;
}

export interface SetShippingAddressJobInput {
  checkoutId: string;
  shippingAddress: ICheckoutAddress;
  email: string;
  channel: string;
  selectedShippingAddressId?: string;
}

export interface SetBillingAddressJobInput {
  checkoutId: string;
  billingAddress: ICheckoutAddress;
  billingAsShipping?: boolean;
  selectedBillingAddressId?: string;
}

export interface SetBillingAddressWithEmailJobInput {
  checkoutId: string;
  email: string;
  billingAddress: ICheckoutAddress;
  selectedBillingAddressId?: string;
}

export interface SetShippingMethodJobInput {
  checkoutId: string;
  shippingMethodId: string;
}

export interface AddPromoCodeJobInput {
  checkoutId: string;
  promoCode: string;
}

export interface RemovePromoCodeJobInput {
  checkoutId: string;
  promoCode: string;
}

export interface CreatePaymentJobInput {
  checkoutId: string;
  amount: number;
  gateway: string;
  token?: string;
  creditCard?: ICreditCard;
  returnUrl?: string;
}

export interface CompleteCheckoutJobInput {
  checkoutId: string;
  paymentData?: object;
  redirectUrl?: string;
  storeSource?: boolean;
}

export interface SetShippingMethodJobRelayInput {
  checkoutToken: string;
  selectShippingMethod: SelectShippingMethodValue;
}

export interface SelectShippingMethodValue {
  id: string;
  name: string;
  price: SelectShippingMethodPriceValue | null;
}

export interface SelectShippingMethodPriceValue {
  currency: string;
  amount: number;
}

export interface selectPromoCodeJobInput {
  promoCode: string;
}

export interface cardValue {
  cardNo: string;
  brand: string;
  cvc: number;
  year: number;
  month: number;
}
