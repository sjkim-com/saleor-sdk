import ApolloClient from "apollo-client";

import { v4 as uuidv4 } from "uuid";
import { Checkout } from "../../fragments/gqlTypes/Checkout";
import { Payment } from "../../fragments/gqlTypes/Payment";
import { User } from "../../fragments/gqlTypes/User";
import { CountryCode } from "../../gqlTypes/globalTypes";
import {
  ICheckoutAddress,
  ICheckoutModel,
  ICheckoutModelLine,
  IPaymentModel,
} from "../../helpers/LocalStorageHandler";
import * as AuthMutations from "../../mutations/auth";
import * as UserMutations from "../../mutations/user";
import * as CheckoutMutations from "../../mutations/checkout";
import * as CmgtCheckoutMutations from "../../mutations/cmgtCheckout";
import {
  AddCheckoutPromoCode,
  AddCheckoutPromoCodeVariables,
} from "../../mutations/gqlTypes/AddCheckoutPromoCode";
import {
  CompleteCheckout,
  CompleteCheckoutVariables,
} from "../../mutations/gqlTypes/CompleteCheckout";
import {
  CreateCheckout,
  CreateCheckoutVariables,
} from "../../mutations/gqlTypes/CreateCheckout";
import {
  CreateCheckoutPayment,
  CreateCheckoutPaymentVariables,
} from "../../mutations/gqlTypes/CreateCheckoutPayment";
import {
  RemoveCheckoutPromoCode,
  RemoveCheckoutPromoCodeVariables,
} from "../../mutations/gqlTypes/RemoveCheckoutPromoCode";
import {
  RegisterAccount,
  RegisterAccountVariables,
} from "../../mutations/gqlTypes/RegisterAccount";
import {
  ResetPasswordRequest,
  ResetPasswordRequestVariables,
} from "../../mutations/gqlTypes/ResetPasswordRequest";
import {
  TokenAuth,
  TokenAuthVariables,
} from "../../mutations/gqlTypes/TokenAuth";
import {
  VerifyToken,
  VerifyTokenVariables,
} from "../../mutations/gqlTypes/VerifyToken";
import {
  RefreshToken,
  RefreshTokenVariables,
} from "../../mutations/gqlTypes/RefreshToken";
import {
  UpdateCheckoutBillingAddress,
  UpdateCheckoutBillingAddressVariables,
} from "../../mutations/gqlTypes/UpdateCheckoutBillingAddress";
import {
  UpdateCheckoutBillingAddressWithEmail,
  UpdateCheckoutBillingAddressWithEmailVariables,
} from "../../mutations/gqlTypes/UpdateCheckoutBillingAddressWithEmail";
import {
  UpdateCheckoutLine,
  UpdateCheckoutLineVariables,
} from "../../mutations/gqlTypes/UpdateCheckoutLine";
import {
  UpdateCheckoutShippingAddress,
  UpdateCheckoutShippingAddressVariables,
} from "../../mutations/gqlTypes/UpdateCheckoutShippingAddress";
import {
  UpdateCheckoutShippingMethod,
  UpdateCheckoutShippingMethodVariables,
} from "../../mutations/gqlTypes/UpdateCheckoutShippingMethod";
import * as CheckoutQueries from "../../queries/checkout";
import * as CmgtCheckoutQueries from "../../queries/cmgtCheckout";
import { CheckoutDetails } from "../../queries/gqlTypes/CheckoutDetails";
import {
  CheckoutProductVariants,
  CheckoutProductVariants_productVariants,
} from "../../queries/gqlTypes/CheckoutProductVariants";
import { UserCheckoutDetails } from "../../queries/gqlTypes/UserCheckoutDetails";
import { UserDetails } from "../../queries/gqlTypes/UserDetails";
import * as UserQueries from "../../queries/user";
import { filterNotEmptyArrayItems, decoderOfRelayId } from "../../utils";
import {
  CreatePaymentInput,
  CompleteCheckoutInput,
  VerifySignInTokenInput,
  RefreshSignInTokenInput,
} from "./types";

// CMGT用
import {
  CmgtCheckoutProductVariants,
  CmgtCheckoutProductVariants_pms_saleproduct_connection,
} from "../../queries/gqlTypes/CmgtCheckoutProductVariants";
import {
  CombinationLinesType,
  resultAddressType,
  resultCheckoutType,
  resultShippingMethodsType,
  resultShippingShippingZoneType,
  addressValueType,
  SelectShippingMethodValue,
  SelectPromoValue,
  CreatePaymentObjectInput,
  paymentValue,
  cardValue,
  paymentListWithCheckout,
  orderValue,
} from "./typesRelay";
import { createCheckoutProductVariantsResponse } from "../../dataConverter/Cart";
import {
  updateAddressVariablesConvert,
  setAddressDataCheckoutConvert,
  updateCheckoutEmailVariablesConvert,
  createCheckoutVariablesConvert,
  createAddressVariablesConvert,
  createCheckoutDataModelConvert,
  setTargetCheckoutConvert,
  addPromoCodeVariablesConvert,
} from "../../dataConverter/Checkout";

export class ApolloClientManager {
  private client: ApolloClient<any>;

  constructor(client: ApolloClient<any>) {
    this.client = client;
  }

  subscribeToUserChange = (
    next: (value: User | null) => void,
    error?: (error: any) => void,
    complete?: () => void
  ) => {
    this.client
      .watchQuery<UserDetails, any>({
        fetchPolicy: "cache-only",
        query: UserQueries.getUserDetailsQuery,
      })
      .subscribe(value => next(value.data?.me), error, complete);
  };

  getUser = async () => {
    const { data, errors } = await this.client.query<UserDetails, any>({
      fetchPolicy: "network-only",
      query: UserQueries.getUserDetailsQuery,
    });

    if (errors?.length) {
      return {
        error: errors,
      };
    }
    return {
      data: data?.me,
    };
  };

  registerAccount = async (
    email: string,
    password: string,
    redirectUrl: string
  ) => {
    const { data, errors } = await this.client.mutate<
      RegisterAccount,
      RegisterAccountVariables
    >({
      fetchPolicy: "no-cache",
      mutation: UserMutations.registerAccount,
      variables: {
        email,
        password,
        redirectUrl,
      },
    });

    if (errors?.length) {
      return {
        error: errors,
      };
    }
    if (data?.accountRegister?.accountErrors.length) {
      return {
        error: data.accountRegister.accountErrors,
      };
    }
    return {
      data: {
        requiresConfirmation: data?.accountRegister?.requiresConfirmation,
      },
    };
  };

  resetPasswordRequest = async (email: string, redirectUrl: string) => {
    const { data, errors } = await this.client.mutate<
      ResetPasswordRequest,
      ResetPasswordRequestVariables
    >({
      fetchPolicy: "no-cache",
      mutation: UserMutations.resetPasswordRequest,
      variables: {
        email,
        redirectUrl,
      },
    });

    if (errors?.length) {
      return {
        error: errors,
      };
    }
    if (data?.requestPasswordReset?.accountErrors.length) {
      return {
        error: data.requestPasswordReset.accountErrors,
      };
    }
    return {};
  };

  signIn = async (email: string, password: string) => {
    const { data, errors } = await this.client.mutate<
      TokenAuth,
      TokenAuthVariables
    >({
      fetchPolicy: "no-cache",
      mutation: AuthMutations.tokenAuthMutation,
      variables: {
        email,
        password,
      },
    });

    if (errors?.length) {
      return {
        error: errors,
      };
    }
    if (data?.tokenCreate?.errors.length) {
      return {
        error: data.tokenCreate.errors,
      };
    }
    return {
      data: {
        csrfToken: data?.tokenCreate?.csrfToken,
        token: data?.tokenCreate?.token,
        user: data?.tokenCreate?.user,
      },
    };
  };

  signOut = async () => {
    await this.client.resetStore();
  };

  verifySignInToken = async ({ token }: VerifySignInTokenInput) => {
    const { data, errors } = await this.client.mutate<
      VerifyToken,
      VerifyTokenVariables
    >({
      fetchPolicy: "no-cache",
      mutation: AuthMutations.tokenVeryficationMutation,
      variables: {
        token,
      },
    });

    if (errors?.length) {
      return {
        error: errors,
      };
    }
    if (data?.tokenVerify?.errors.length) {
      return {
        error: data.tokenVerify.errors,
      };
    }
    return {
      data: {
        isValid: data?.tokenVerify?.isValid,
        payload: data?.tokenVerify?.payload,
        user: data?.tokenVerify?.user,
      },
    };
  };

  refreshSignInToken = async ({
    csrfToken,
    refreshToken,
  }: RefreshSignInTokenInput) => {
    const { data, errors } = await this.client.mutate<
      RefreshToken,
      RefreshTokenVariables
    >({
      fetchPolicy: "no-cache",
      mutation: AuthMutations.tokenRefreshMutation,
      variables: {
        csrfToken,
        refreshToken,
      },
    });

    if (errors?.length) {
      return {
        error: errors,
      };
    }
    if (data?.tokenRefresh?.errors.length) {
      return {
        error: data.tokenRefresh.errors,
      };
    }
    return {
      data: {
        token: data?.tokenRefresh?.token,
        user: data?.tokenRefresh?.user,
      },
    };
  };

  getCheckout = async (
    isUserSignedIn: boolean,
    // channel: string,
    checkoutToken: string | null
  ) => {
    let checkout: Checkout | null;
    try {
      checkout = await new Promise(async (resolve, reject) => {
        // if (isUserSignedIn) {
        //   const { data, errors } = await this.client.query<
        //     UserCheckoutTokenList,
        //     UserCheckoutTokenListVariables
        //   >({
        //     fetchPolicy: "network-only",
        //     query: CheckoutQueries.userCheckoutTokenList,
        //     variables: {
        //       channel,
        //     },
        //   });
        //
        //   if (errors?.length) {
        //     reject(errors);
        //   } else if (data.me?.checkoutTokens) {
        //     [token] = data.me.checkoutTokens;
        //   }
        // }
        //
        // if (token) {
        //   const observable = this.client.watchQuery<CheckoutDetails, any>({
        //     fetchPolicy: "network-only",
        //     query: CheckoutQueries.checkoutDetails,
        //     variables: {
        //       token,
        //     },
        //   });
        if (isUserSignedIn) {
          const observable = this.client.watchQuery<UserCheckoutDetails, any>({
            fetchPolicy: "network-only",
            query: CheckoutQueries.userCheckoutDetails,
          });
          observable.subscribe(
            result => {
              const { data, errors } = result;
              if (errors?.length) {
                reject(errors);
              } else {
                resolve(data.me?.checkout || null);
              }
            },
            error => {
              reject(error);
            }
          );
        } else if (checkoutToken) {
          const observable = this.client.watchQuery<CheckoutDetails, any>({
            fetchPolicy: "network-only",
            query: CheckoutQueries.checkoutDetails,
            variables: {
              token: checkoutToken,
            },
          });
          observable.subscribe(
            result => {
              const { data, errors } = result;
              if (errors?.length) {
                reject(errors);
              } else {
                resolve(data.checkout);
              }
            },
            error => {
              reject(error);
            }
          );
        } else {
          resolve(null);
        }
      });

      if (checkout) {
        return {
          data: this.constructCheckoutModel(checkout),
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
    return {};
  };

  getRefreshedCheckoutLines = async (
    checkoutlines: ICheckoutModelLine[] | null,
    channel: string
  ) => {
    const idsOfMissingVariants = checkoutlines
      ?.filter(line => !line.variant || !line.totalPrice)
      .map(line => line.variant.id);
    const linesWithProperVariant =
      checkoutlines?.filter(line => line.variant && line.totalPrice) || [];

    let variants: CheckoutProductVariants_productVariants | null | undefined;
    if (idsOfMissingVariants && idsOfMissingVariants.length) {
      try {
        const observable = this.client.watchQuery<CheckoutProductVariants, any>(
          {
            query: CheckoutQueries.checkoutProductVariants,
            variables: {
              channel,
              ids: idsOfMissingVariants,
            },
          }
        );
        variants = await new Promise((resolve, reject) => {
          observable.subscribe(
            result => {
              const { data, errors } = result;
              if (errors?.length) {
                reject(errors);
              } else {
                resolve(data.productVariants);
              }
            },
            error => {
              reject(error);
            }
          );
        });
      } catch (error) {
        return {
          error,
        };
      }
    }

    const linesWithMissingVariantUpdated = variants
      ? variants.edges.map(edge => {
          const existingLine = checkoutlines?.find(
            line => line.variant.id === edge.node.id
          );
          const variantPricing = edge.node.pricing?.price;
          const totalPrice = variantPricing
            ? {
                gross: {
                  ...variantPricing.gross,
                  amount:
                    variantPricing.gross.amount * (existingLine?.quantity || 0),
                },
                net: {
                  ...variantPricing.net,
                  amount:
                    variantPricing.net.amount * (existingLine?.quantity || 0),
                },
              }
            : null;

          return {
            id: existingLine?.id,
            quantity: existingLine?.quantity || 0,
            totalPrice,
            variant: {
              attributes: edge.node.attributes,
              id: edge.node.id,
              name: edge.node.name,
              pricing: edge.node.pricing,
              product: edge.node.product,
              quantityAvailable: edge.node.quantityAvailable,
              sku: edge.node.sku,
            },
          };
        })
      : [];

    const linesWithProperVariantUpdated = linesWithProperVariant.map(line => {
      const variantPricing = line.variant.pricing?.price;
      const totalPrice = variantPricing
        ? {
            gross: {
              ...variantPricing.gross,
              amount: variantPricing.gross.amount * line.quantity,
            },
            net: {
              ...variantPricing.net,
              amount: variantPricing.net.amount * line.quantity,
            },
          }
        : null;

      return {
        id: line.id,
        quantity: line.quantity,
        totalPrice,
        variant: line.variant,
      };
    });

    return {
      data: [
        ...linesWithMissingVariantUpdated,
        ...linesWithProperVariantUpdated,
      ],
    };
  };

  // CMGT用
  cmgtGetRefreshedCheckoutLines = async (
    checkoutlines: ICheckoutModelLine[] | null
  ) => {
    const idsOfMissingVariants = checkoutlines
      ?.filter(line => !line.variant || !line.totalPrice)
      .map(line => line.variant.id);
    const linesWithProperVariant =
      checkoutlines?.filter(line => line.variant && line.totalPrice) || [];

    let cmgtVariants:
      | CmgtCheckoutProductVariants_pms_saleproduct_connection
      | null
      | undefined;

    if (idsOfMissingVariants && idsOfMissingVariants.length) {
      try {
        const observable = this.client.watchQuery<
          CmgtCheckoutProductVariants,
          any
        >({
          query: CmgtCheckoutQueries.cmgtCheckoutProductVariants,
          variables: {
            ids: idsOfMissingVariants,
          },
        });
        cmgtVariants = await new Promise((resolve, reject) => {
          observable.subscribe(
            result => {
              const { data, errors } = result;
              if (errors?.length) {
                reject(errors);
              } else {
                resolve(data.pms_saleproduct_connection);
              }
            },
            error => {
              reject(error);
            }
          );
        });
      } catch (error) {
        return {
          error,
        };
      }
    }

    const variants = createCheckoutProductVariantsResponse(cmgtVariants);
    const linesWithMissingVariantUpdated = variants
      ? variants[0].edges.map(edge => {
          const existingLine = checkoutlines?.find(
            line => line.variant.id === edge.node.sku
          );
          const variantPricing = edge.node.pricing?.price;
          const totalPrice = variantPricing
            ? {
                gross: {
                  ...variantPricing.gross,
                  amount:
                    variantPricing.gross.amount * (existingLine?.quantity || 0),
                },
                net: {
                  ...variantPricing.net,
                  amount:
                    variantPricing.net.amount * (existingLine?.quantity || 0),
                },
              }
            : null;

          let stock =
            edge.node.quantityAvailable - (existingLine?.quantity || 0);
          stock = stock > 0 ? stock : 0;

          return {
            id: existingLine?.id,
            quantity: existingLine?.quantity || 0,
            totalPrice,
            variant: {
              attributes: edge.node.attributes,
              id: edge.node.id,
              name: edge.node.name,
              pricing: edge.node.pricing,
              product: edge.node.product,
              quantityAvailable: stock,
              sku: edge.node.sku,
            },
          };
        })
      : [];

    const linesWithProperVariantUpdated = linesWithProperVariant.map(line => {
      const variantPricing = line.variant.pricing?.price;
      const totalPrice = variantPricing
        ? {
            gross: {
              ...variantPricing.gross,
              amount: variantPricing.gross.amount * line.quantity,
            },
            net: {
              ...variantPricing.net,
              amount: variantPricing.net.amount * line.quantity,
            },
          }
        : null;

      return {
        id: line.id,
        quantity: line.quantity,
        totalPrice,
        variant: line.variant,
      };
    });

    return {
      data: [
        ...linesWithMissingVariantUpdated,
        ...linesWithProperVariantUpdated,
      ],
    };
  };

  createCheckout = async (
    email: string,
    lines: Array<{ variantId: string; quantity: number }>,
    channel: string,
    shippingAddress?: ICheckoutAddress,
    billingAddress?: ICheckoutAddress
  ) => {
    try {
      const variables = {
        checkoutInput: {
          billingAddress: billingAddress && {
            city: billingAddress.city,
            companyName: billingAddress.companyName,
            country:
              CountryCode[
                billingAddress?.country?.code as keyof typeof CountryCode
              ],
            countryArea: billingAddress.countryArea,
            firstName: billingAddress.firstName,
            lastName: billingAddress.lastName,
            phone: billingAddress.phone,
            postalCode: billingAddress.postalCode,
            streetAddress1: billingAddress.streetAddress1,
            streetAddress2: billingAddress.streetAddress2,
          },
          channel,
          email,
          lines,
          shippingAddress: shippingAddress && {
            city: shippingAddress.city,
            companyName: shippingAddress.companyName,
            country:
              CountryCode[
                shippingAddress?.country?.code as keyof typeof CountryCode
              ],
            countryArea: shippingAddress.countryArea,
            firstName: shippingAddress.firstName,
            lastName: shippingAddress.lastName,
            phone: shippingAddress.phone,
            postalCode: shippingAddress.postalCode,
            streetAddress1: shippingAddress.streetAddress1,
            streetAddress2: shippingAddress.streetAddress2,
          },
        },
      };
      const { data, errors } = await this.client.mutate<
        CreateCheckout,
        CreateCheckoutVariables
      >({
        mutation: CheckoutMutations.createCheckoutMutation,
        variables,
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      if (data?.checkoutCreate?.errors.length) {
        return {
          error: data?.checkoutCreate?.errors,
        };
      }
      if (data?.checkoutCreate?.checkout) {
        return {
          data: this.constructCheckoutModel(data.checkoutCreate.checkout),
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
    return {};
  };

  cmgtCreateCheckout = async (
    email: string,
    shippingAddress?: ICheckoutAddress,
    combinationLines?: CombinationLinesType[]
  ) => {
    try {
      const variables = createCheckoutVariablesConvert(
        email,
        shippingAddress,
        combinationLines
      );

      const { data, errors } = await this.client.mutate({
        mutation: CmgtCheckoutMutations.createCheckoutRelay,
        variables,
      });

      if (errors?.length) {
        return {
          checkoutError: errors,
        };
      }
      if (data.insert_checkout_checkout.affected_rows > 0) {
        return {
          checkoutData: data.insert_checkout_checkout.returning[0],
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
    return {};
  };

  cmgtCreateAddress = async (shippingAddress?: ICheckoutAddress) => {
    try {
      const variables = createAddressVariablesConvert(shippingAddress);

      const { data, errors } = await this.client.mutate({
        mutation: CmgtCheckoutMutations.createAddressMutationRelay,
        variables,
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      if (data.insert_account_address.affected_rows > 0) {
        return {
          data: data.insert_account_address.returning[0],
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
    return {};
  };

  cmgtSelectShippingMethodList = async (
    countryCode: string,
    lines?: ICheckoutModelLine[]
  ) => {
    let availableShippingMethod: resultShippingMethodsType | null;

    const country = "%".concat(countryCode).concat("%");

    try {
      const shippingMethodList = this.client.watchQuery<
        resultShippingShippingZoneType,
        any
      >({
        query: CmgtCheckoutQueries.shippingMethodByCountry,
        variables: { countryCode: country },
      });

      availableShippingMethod = await new Promise((resolve, reject) => {
        shippingMethodList.subscribe(
          result => {
            const { data, errors } = result;

            if (
              errors === null || errors === undefined
                ? undefined
                : errors.length
            ) {
              reject(errors);
            } else {
              resolve({
                availableShippingMethods: data.shipping_shippingzone_connection.edges[0].node.shipping_shippingmethods.map(
                  method => {
                    return {
                      id: method.id,
                      name: method.name,
                      price: {
                        amount: method.price_amount,
                        currency: method.currency,
                      },
                    };
                  }
                ),
              });
            }
          },
          error => {
            reject(error);
          }
        );
      });
    } catch (error) {
      return {
        shippingMethodError: error,
      };
    }
    return { shippingMethodData: availableShippingMethod };
  };

  cmgtDataReconstruction = async (
    email: string,
    lines?: ICheckoutModelLine[],
    resultAddress?: resultAddressType,
    resultCheckout?: resultCheckoutType,
    resultShippingMethod?: resultShippingMethodsType | null
  ) => {
    const result = createCheckoutDataModelConvert(
      email,
      lines,
      resultAddress,
      resultCheckout,
      resultShippingMethod
    );
    return {
      resultData: this.constructCheckoutModel(result),
    };
  };

  setCartItem = async (checkout: ICheckoutModel) => {
    const checkoutId = checkout.id;
    const { lines } = checkout;

    if (checkoutId && lines) {
      const alteredLines = lines.map(line => ({
        quantity: line.quantity,
        variantId: line.variant.id,
      }));

      try {
        const { data, errors } = await this.client.mutate<
          UpdateCheckoutLine,
          UpdateCheckoutLineVariables
        >({
          mutation: CheckoutMutations.updateCheckoutLineMutation,
          variables: {
            checkoutId,
            lines: alteredLines,
          },
        });

        if (errors?.length) {
          return {
            error: errors,
          };
        }
        if (data?.checkoutLinesUpdate?.errors.length) {
          return {
            error: data?.checkoutLinesUpdate?.errors,
          };
        }
        if (data?.checkoutLinesUpdate?.checkout) {
          return {
            data: this.constructCheckoutModel(
              data.checkoutLinesUpdate.checkout
            ),
          };
        }
      } catch (error) {
        return {
          error,
        };
      }
    }
    return {};
  };

  setShippingAddress = async (
    shippingAddress: ICheckoutAddress,
    email: string,
    checkoutId: string,
    channel: string
  ) => {
    try {
      const variables = {
        channel,
        checkoutId,
        email,
        shippingAddress: {
          city: shippingAddress.city,
          companyName: shippingAddress.companyName,
          country:
            CountryCode[
              shippingAddress?.country?.code as keyof typeof CountryCode
            ],
          countryArea: shippingAddress.countryArea,
          firstName: shippingAddress.firstName,
          lastName: shippingAddress.lastName,
          phone: shippingAddress.phone,
          postalCode: shippingAddress.postalCode,
          streetAddress1: shippingAddress.streetAddress1,
          streetAddress2: shippingAddress.streetAddress2,
        },
      };
      const { data, errors } = await this.client.mutate<
        UpdateCheckoutShippingAddress,
        UpdateCheckoutShippingAddressVariables
      >({
        mutation: CheckoutMutations.updateCheckoutShippingAddressMutation,
        variables,
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      if (data?.checkoutEmailUpdate?.errors.length) {
        return {
          error: data?.checkoutEmailUpdate?.errors,
        };
      }
      if (data?.checkoutShippingAddressUpdate?.errors.length) {
        return {
          error: data?.checkoutShippingAddressUpdate?.errors,
        };
      }
      if (data?.checkoutShippingAddressUpdate?.checkout) {
        return {
          data: this.constructCheckoutModel(
            data.checkoutShippingAddressUpdate.checkout
          ),
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  cmgtUpdateShippingAddress = async (
    shippingAddress: ICheckoutAddress,
    checkout: ICheckoutModel
  ) => {
    try {
      const shippingAddressCheck = !!(
        checkout.shippingAddress?.id === null ||
        checkout.shippingAddress?.id === undefined
      );

      if (shippingAddressCheck) {
        return {
          updateShippingError: "Shipping Address is Null.",
        };
      }
      const variables = updateAddressVariablesConvert(
        shippingAddress,
        checkout.shippingAddress?.id!
      );

      const { data, errors } = await this.client.mutate({
        mutation: CmgtCheckoutMutations.updateAddress,
        variables,
      });

      if (errors?.length) {
        return {
          updateShippingError: errors,
        };
      }
      if (data.update_account_address.affected_rows > 0) {
        const result = setAddressDataCheckoutConvert(
          variables.addressObject,
          checkout,
          "Shipping"
        );
        return {
          updateShippingData: result,
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  cmgtUpdateBillingAddress = async (
    billingAddress: ICheckoutAddress,
    checkout: ICheckoutModel
  ) => {
    try {
      const billingAddressCheck = !!(
        checkout.billingAddress?.id === null ||
        checkout.billingAddress?.id === undefined
      );

      if (billingAddressCheck) {
        return {
          updateBillingError: "Billing Address is Null.",
        };
      }

      const variables = updateAddressVariablesConvert(
        billingAddress,
        checkout.billingAddress?.id!
      );

      const { data, errors } = await this.client.mutate({
        mutation: CmgtCheckoutMutations.updateAddress,
        variables,
      });

      if (errors?.length) {
        return {
          updateBillingError: errors,
        };
      }
      if (data.update_account_address.affected_rows > 0) {
        const result = setAddressDataCheckoutConvert(
          variables.addressObject,
          checkout,
          "Billing"
        );
        return {
          updateBillingData: result,
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  cmgtUpdateCheckoutEmail = async (email: string, checkout: ICheckoutModel) => {
    try {
      const variables = updateCheckoutEmailVariablesConvert(
        checkout.token,
        email
      );
      const { data, errors } = await this.client.mutate({
        mutation: CmgtCheckoutMutations.updateCheckoutEmail,
        variables,
      });

      if (errors?.length) {
        return {
          updateCheckoutError: errors,
        };
      }
      if (data.update_checkout_checkout.affected_rows > 0) {
        return {
          updateCheckoutData: true,
        };
      }
      return { updateCheckoutData: false };
    } catch (error) {
      return {
        error,
      };
    }
  };

  setBillingAddress = async (
    billingAddress: ICheckoutAddress,
    checkoutId: string
  ) => {
    try {
      const variables = {
        billingAddress: {
          city: billingAddress.city,
          companyName: billingAddress.companyName,
          country:
            CountryCode[
              billingAddress?.country?.code as keyof typeof CountryCode
            ],
          countryArea: billingAddress.countryArea,
          firstName: billingAddress.firstName,
          lastName: billingAddress.lastName,
          phone: billingAddress.phone,
          postalCode: billingAddress.postalCode,
          streetAddress1: billingAddress.streetAddress1,
          streetAddress2: billingAddress.streetAddress2,
        },
        checkoutId,
      };
      const { data, errors } = await this.client.mutate<
        UpdateCheckoutBillingAddress,
        UpdateCheckoutBillingAddressVariables
      >({
        mutation: CheckoutMutations.updateCheckoutBillingAddressMutation,
        variables,
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      if (data?.checkoutBillingAddressUpdate?.errors.length) {
        return {
          error: data?.checkoutBillingAddressUpdate?.errors,
        };
      }
      if (data?.checkoutBillingAddressUpdate?.checkout) {
        return {
          data: this.constructCheckoutModel(
            data.checkoutBillingAddressUpdate.checkout
          ),
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  cmgtSetBillingAddress = async (
    billingAddress: ICheckoutAddress,
    checkoutId: string
  ) => {
    try {
      const variables = createAddressVariablesConvert(billingAddress);

      const { data, errors } = await this.client.mutate({
        mutation: CmgtCheckoutMutations.createAddressMutationRelay,
        variables,
      });

      if (errors?.length) {
        return {
          billingError: errors,
        };
      }
      if (data.insert_account_address.affected_rows > 0) {
        return {
          billingData: data.insert_account_address.returning[0],
        };
      }
      return {};
    } catch (error) {
      return {
        billingError: error,
      };
    }
  };

  cmgtUpdateCheckoutBillingAddress = async (
    billingAddress: addressValueType,
    checkout: ICheckoutModel,
    token: string
  ) => {
    try {
      const variables = setTargetCheckoutConvert(
        token,
        decoderOfRelayId(billingAddress.id!),
        new Date()
      );

      const { data, errors } = await this.client.mutate({
        mutation: CmgtCheckoutMutations.updateBillingAddressHasura,
        variables,
      });

      if (errors?.length) {
        return {
          checkoutBillingError: errors,
        };
      }
      if (data.update_checkout_checkout.affected_rows > 0) {
        checkout.billingAddress = {
          id: billingAddress.id,
          firstName: billingAddress.first_name,
          lastName: billingAddress.last_name,
          companyName: billingAddress.company_name,
          streetAddress1: billingAddress.street_address_1,
          streetAddress2: billingAddress.street_address_2,
          city: billingAddress.city,
          postalCode: billingAddress.postal_code,
          country: {
            code: billingAddress.country,
            country: "Japan",
          },
          countryArea: billingAddress.country_area,
          isDefaultBillingAddress: null,
          isDefaultShippingAddress: null,
        };

        return {
          checkoutBillingData: checkout,
        };
      }
      return {};
    } catch (error) {
      return {
        checkoutBillingError: error,
      };
    }
  };

  setBillingAddressWithEmail = async (
    billingAddress: ICheckoutAddress,
    email: string,
    checkoutId: string
  ) => {
    try {
      const variables = {
        billingAddress: {
          city: billingAddress.city,
          companyName: billingAddress.companyName,
          country:
            CountryCode[
              billingAddress?.country?.code as keyof typeof CountryCode
            ],
          countryArea: billingAddress.countryArea,
          firstName: billingAddress.firstName,
          lastName: billingAddress.lastName,
          phone: billingAddress.phone,
          postalCode: billingAddress.postalCode,
          streetAddress1: billingAddress.streetAddress1,
          streetAddress2: billingAddress.streetAddress2,
        },
        checkoutId,
        email,
      };
      const { data, errors } = await this.client.mutate<
        UpdateCheckoutBillingAddressWithEmail,
        UpdateCheckoutBillingAddressWithEmailVariables
      >({
        mutation:
          CheckoutMutations.updateCheckoutBillingAddressWithEmailMutation,
        variables,
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      if (data?.checkoutEmailUpdate?.errors.length) {
        return {
          error: data?.checkoutEmailUpdate?.errors,
        };
      }
      if (data?.checkoutBillingAddressUpdate?.errors.length) {
        return {
          error: data?.checkoutBillingAddressUpdate?.errors,
        };
      }
      if (data?.checkoutBillingAddressUpdate?.checkout) {
        return {
          data: this.constructCheckoutModel(
            data.checkoutBillingAddressUpdate.checkout
          ),
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  setShippingMethod = async (shippingMethodId: string, checkoutId: string) => {
    try {
      const { data, errors } = await this.client.mutate<
        UpdateCheckoutShippingMethod,
        UpdateCheckoutShippingMethodVariables
      >({
        mutation: CheckoutMutations.updateCheckoutShippingMethodMutation,
        variables: {
          checkoutId,
          shippingMethodId,
        },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      if (data?.checkoutShippingMethodUpdate?.errors.length) {
        return {
          error: data?.checkoutShippingMethodUpdate?.errors,
        };
      }
      if (data?.checkoutShippingMethodUpdate?.checkout) {
        return {
          data: this.constructCheckoutModel(
            data.checkoutShippingMethodUpdate.checkout
          ),
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  cmgtSetShippingMethod = async (
    selectShippingMethod: SelectShippingMethodValue,
    checkoutToken: string,
    checkout: ICheckoutModel
  ) => {
    const methodId = decoderOfRelayId(selectShippingMethod.id);
    try {
      const variables = setTargetCheckoutConvert(
        checkoutToken,
        methodId,
        new Date()
      );
      const { data, errors } = await this.client.mutate({
        mutation: CmgtCheckoutMutations.updateCheckoutShippingMethodHasura,
        variables,
      });

      if (errors?.length) {
        return {
          shippingMethodError: errors,
        };
      }
      if (data.update_checkout_checkout.affected_rows > 0) {
        // selectShippingMethod.id = decoderOfRelayId(selectShippingMethod.id);
        checkout.shippingMethod = selectShippingMethod;

        return {
          shippingMethodData: checkout,
        };
      }
      return {};
    } catch (error) {
      return {
        shippingMethodError: error,
      };
    }
  };

  addPromoCode = async (promoCode: string, checkoutId: string) => {
    try {
      const { data, errors } = await this.client.mutate<
        AddCheckoutPromoCode,
        AddCheckoutPromoCodeVariables
      >({
        mutation: CheckoutMutations.addCheckoutPromoCode,
        variables: { checkoutId, promoCode },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      if (data?.checkoutAddPromoCode?.errors.length) {
        return {
          error: data?.checkoutAddPromoCode?.errors,
        };
      }
      if (data?.checkoutAddPromoCode?.checkout) {
        return {
          data: this.constructCheckoutModel(data.checkoutAddPromoCode.checkout),
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  selectPromoCode = async (promoCode: string) => {
    try {
      const { data, errors } = await this.client.mutate({
        mutation: CmgtCheckoutQueries.selecDiscountVoucher,
        variables: { discountCode: promoCode },
      });

      if (errors?.length) {
        return {
          selectPromoError: {
            code: "INVALID",
            field: "promoCode",
            message: "Promo code is invalid",
            __typename: "CheckoutError",
          },
        };
      }

      if (data.discount_voucher_connection.edges.length > 0) {
        return {
          selectPromoData: data.discount_voucher_connection.edges[0].node,
        };
      }
      return {};
    } catch (error) {
      return {
        selectPromoError: error,
      };
    }
  };

  cmgtAddPromoCode = async (
    promoCode: SelectPromoValue,
    checkout: ICheckoutModel
  ) => {
    try {
      const variables = addPromoCodeVariablesConvert(promoCode, checkout);

      const { data, errors } = await this.client.mutate({
        mutation: CmgtCheckoutMutations.updateCheckoutDiscount,
        variables,
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      if (data.update_checkout_checkout.affected_rows > 0) {
        checkout.promoCodeDiscount = {
          discount: {
            currency: data.update_checkout_checkout.returning[0].currency,
            amount: data.update_checkout_checkout.returning[0].discount_amount,
          },
          discountName:
            data.update_checkout_checkout.returning[0].discount_name,
          voucherCode: data.update_checkout_checkout.returning[0].voucher_code,
        };
        return {
          data: checkout,
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  removePromoCode = async (promoCode: string, checkoutId: string) => {
    try {
      const { data, errors } = await this.client.mutate<
        RemoveCheckoutPromoCode,
        RemoveCheckoutPromoCodeVariables
      >({
        mutation: CheckoutMutations.removeCheckoutPromoCode,
        variables: { checkoutId, promoCode },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      if (data?.checkoutRemovePromoCode?.errors.length) {
        return {
          error: data?.checkoutRemovePromoCode?.errors,
        };
      }
      if (data?.checkoutRemovePromoCode?.checkout) {
        return {
          data: this.constructCheckoutModel(
            data.checkoutRemovePromoCode.checkout
          ),
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  createPayment = async ({
    amount,
    checkoutId,
    gateway,
    token,
    returnUrl,
  }: CreatePaymentInput) => {
    try {
      const variables = {
        checkoutId,
        paymentInput: {
          amount,
          gateway,
          returnUrl,
          token,
        },
      };
      const { data, errors } = await this.client.mutate<
        CreateCheckoutPayment,
        CreateCheckoutPaymentVariables
      >({
        mutation: CheckoutMutations.createCheckoutPaymentMutation,
        variables,
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      if (data?.checkoutPaymentCreate?.errors.length) {
        return {
          error: data?.checkoutPaymentCreate?.errors,
        };
      }
      if (data?.checkoutPaymentCreate?.payment) {
        return {
          data: this.constructPaymentModel(data.checkoutPaymentCreate.payment),
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  cmgtExistPayment = async (token: string) => {
    try {
      const { errors } = await this.client.mutate({
        mutation: CmgtCheckoutMutations.updatePaymentActive,
        variables: {
          token,
        },
      });

      if (errors?.length) {
        return {
          existPaymentError: errors,
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  cmgtCreatePayment = async ({
    amount,
    checkout,
    gateway,
    token,
    returnUrl,
  }: CreatePaymentObjectInput) => {
    try {
      const variables = {
        paymentObject: {
          gateway,
          is_active: true,
          to_confirm: false,
          created: new Date(),
          modified: new Date(),
          charge_status: "not-charged",
          token,
          total: amount,
          captured_amount: 0,
          currency: "JPY",
          checkout_id: checkout?.token,
          order_id: null,
          billing_email: checkout?.email,
          billing_first_name: checkout?.billingAddress?.firstName,
          billing_last_name: checkout?.billingAddress?.lastName,
          billing_company_name: checkout?.billingAddress?.companyName,
          billing_city: checkout?.billingAddress?.city,
          billing_city_area: "",
          billing_address_1: checkout?.billingAddress?.streetAddress1,
          billing_address_2: checkout?.billingAddress?.streetAddress2,
          billing_postal_code: checkout?.billingAddress?.postalCode,
          billing_country_code: checkout?.billingAddress?.country?.code,
          billing_country_area: checkout?.billingAddress?.countryArea,
          cc_first_digits: "",
          cc_last_digits: "",
          cc_brand: "",
          cc_exp_month: null,
          cc_exp_year: null,
          payment_method_type: "",
          // TODO: ip 취득
          customer_ip_address: "127.0.0.1",
          // TODO: userAgent 취득
          extra_data: "",
          return_url: returnUrl,
        },
      };

      const { data, errors } = await this.client.mutate({
        mutation: CmgtCheckoutMutations.createPaymentRelay,
        variables,
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      if (data.insert_payment_payment.affected_rows > 0) {
        const payment: Payment = {
          __typename: "Payment",
          id: data.insert_payment_payment.returning[0].id,
          gateway: data.insert_payment_payment.returning[0].gateway,
          token: data.insert_payment_payment.returning[0].token,
          creditCard: null,
          total: {
            __typename: "Money",
            amount: data.insert_payment_payment.returning[0].total,
            currency: data.insert_payment_payment.returning[0].currency,
          },
        };

        return {
          data: this.constructPaymentModel(payment),
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  completeCheckout = async ({
    checkoutId,
    paymentData,
    redirectUrl,
    storeSource,
  }: CompleteCheckoutInput) => {
    try {
      const paymentDataString = paymentData && JSON.stringify(paymentData);

      const { data, errors } = await this.client.mutate<
        CompleteCheckout,
        CompleteCheckoutVariables
      >({
        mutation: CheckoutMutations.completeCheckoutMutation,
        variables: {
          checkoutId,
          paymentData: paymentDataString,
          redirectUrl,
          storeSource,
        },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      if (data?.checkoutComplete?.errors.length) {
        return {
          error: data?.checkoutComplete?.errors,
        };
      }
      if (data?.checkoutComplete) {
        return {
          data: data.checkoutComplete,
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  cmgtUpdaChekcoutTrackingCode = async (checkoutToken: string) => {
    try {
      const { data, errors } = await this.client.mutate({
        mutation: CmgtCheckoutMutations.updaChekcoutTrackingCode,
        variables: {
          token: checkoutToken,
          trackingCode: uuidv4(),
          lastChange: new Date(),
        },
      });

      if (errors?.length) {
        return {
          trackingError: errors,
        };
      }
      if (data.update_checkout_checkout.affected_rows > 0) {
        return {
          trackingData: data.update_checkout_checkout.returning[0],
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  cmgtUpdateDiscountVoucherUsed = async (promoCode: string) => {
    try {
      if (promoCode === null) {
        return { DiscountVoucherData: null };
      }

      const { data, errors } = await this.client.mutate({
        mutation: CmgtCheckoutMutations.updateDiscountVoucherUsed,
        variables: {
          code: {
            _eq: promoCode,
          },
        },
      });

      if (errors?.length) {
        return {
          DiscountVoucherError: errors,
        };
      }
      if (data.update_discount_voucher.affected_rows > 0) {
        return {
          DiscountVoucherData: decoderOfRelayId(
            data.update_discount_voucher.returning[0].id
          ),
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  cmgtInsertPaymentTransaction = async (paymentData: paymentValue) => {
    try {
      const { data, errors } = await this.client.mutate({
        mutation: CmgtCheckoutMutations.insertPaymentTransaction,
        variables: {
          paymentTranObject: {
            created: new Date(),
            payment_id: decoderOfRelayId(paymentData.id),
            token: paymentData.token,
            kind: "capture",
            is_success: true,
            action_required: false,
            action_required_data: {},
            currency: paymentData.total.currency,
            amount: paymentData.total.amount,
            error: null,
            // TODO: login시 추가부분
            customer_id: null,
            gateway_response: {},
            already_processed: false,
            searchable_key: "",
          },
        },
      });

      if (errors?.length) {
        return {
          PaymentTranError: errors,
        };
      }
      if (data.insert_payment_transaction.affected_rows > 0) {
        return {
          PaymentTranData: decoderOfRelayId(
            data.insert_payment_transaction.returning[0].id
          ),
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  cmgtUpdatePaymentResult = async (
    paymentData: paymentValue,
    cardInfo: cardValue
  ) => {
    try {
      const { data, errors } = await this.client.mutate({
        mutation: CmgtCheckoutMutations.updatePaymentResult,
        variables: {
          paymentId: decoderOfRelayId(paymentData.id),
          cardBrand: cardInfo.brand,
          cardMonth: cardInfo.month,
          cardYear: cardInfo.year,
          paymentMethodType: "card",
          modified: new Date(),
          charge_status: "fully-charged",
          capturedAmt: paymentData.total.amount,
        },
      });

      if (errors?.length) {
        return {
          PaymentResultError: errors,
        };
      }
      if (data.update_payment_payment.affected_rows > 0) {
        return {
          PaymentResultData: true,
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  cmgtUpdatePaymentTransaction = async (paymentTranId: number) => {
    try {
      const { data, errors } = await this.client.mutate({
        mutation: CmgtCheckoutMutations.updatePaymentTransaction,
        variables: {
          paymentTranId,
        },
      });

      if (errors?.length) {
        return {
          UpdatePaymentTranError: errors,
        };
      }
      if (data.update_payment_transaction.affected_rows > 0) {
        return {
          UpdatePaymentTranData: true,
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  cmgtInsertOrder = async (
    trackingCode: string,
    paymentTranId: number,
    discountId: number,
    checkout: ICheckoutModel,
    paymentData: paymentValue,
    userId: number
  ) => {
    try {
      const orderToken = uuidv4();

      const orderLines = checkout.lines?.map(line => {
        return {
          // variant_id: decoderOfRelayId(line.variant.id),
          saleproduct_id: line.variant.id,
          product_name: line.variant.product?.name,
          variant_name: line.variant.name,
          translated_product_name: "",
          translated_variant_name: "",
          product_sku: line.variant.sku,
          is_shipping_required:
            line.variant.product?.productType.isShippingRequired,
          quantity: line.quantity,
          quantity_fulfilled: 0,
          currency: line.totalPrice?.net.currency,
          unit_price_net_amount: line.totalPrice?.net.amount,
          unit_price_gross_amount: line.totalPrice?.gross.amount,
          tax_rate: 0,
        };
      });

      const { data, errors } = await this.client.mutate({
        mutation: CmgtCheckoutMutations.insertOrder,
        variables: {
          orderObject: {
            private_metadata: {},
            metadata: {},
            created: new Date(),
            status: "unfulfilled",
            user_id: userId === undefined || userId === null ? null : userId,
            language_code: "jp",
            tracking_client_id: trackingCode,
            billing_address_id: decoderOfRelayId(checkout.billingAddress?.id!),
            shipping_address_id: decoderOfRelayId(
              checkout.shippingAddress?.id!
            ),
            user_email: checkout.email,
            currency: paymentData.total.currency,
            shipping_method_id: decoderOfRelayId(checkout.shippingMethod?.id!),
            shipping_method_name: checkout.shippingMethod?.name,
            shipping_price_net_amount:
              checkout.shippingMethod?.price?.amount! -
              checkout.promoCodeDiscount?.discount?.amount!,
            shipping_price_gross_amount:
              checkout.shippingMethod?.price?.amount! -
              checkout.promoCodeDiscount?.discount?.amount!,
            token: orderToken,
            checkout_token: checkout.token,
            total_net_amount: paymentData.total.amount,
            total_gross_amount: paymentData.total.amount,
            voucher_id: discountId,
            discount_amount: checkout.promoCodeDiscount?.discount?.amount,
            discount_name: checkout.promoCodeDiscount?.discountName,
            translated_discount_name: "",
            display_gross_prices: true,
            customer_note: "",
            // TODO : 중량 어떻게 할지
            weight: 1000,
            order_orderlines: {
              data: orderLines,
            },
          },
        },
      });

      if (errors?.length) {
        return {
          orderError: errors,
        };
      }
      if (data.insert_order_order.affected_rows > 0) {
        return {
          orderData: data.insert_order_order.returning[0],
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  cmgtSelectLastOrderNo = async () => {
    let lastOrderInfo: number;

    try {
      const lastOrder = this.client.watchQuery({
        query: CmgtCheckoutQueries.cmgtSelectLastOrderNo,
        fetchPolicy: "network-only",
      });

      lastOrderInfo = await new Promise((resolve, reject) => {
        lastOrder.subscribe(
          result => {
            const { data, errors } = result;

            if (
              errors === null || errors === undefined
                ? undefined
                : errors.length
            ) {
              reject(errors);
            } else {
              resolve(
                decoderOfRelayId(data.order_order_connection.edges[0].node.id)
              );
            }
          },
          error => {
            reject(error);
          }
        );
      });
    } catch (error) {
      return {
        error,
      };
    }
    return { data: lastOrderInfo };
  };

  cmgtUpdatePaymentOrderId = async (
    orderData: orderValue,
    checkoutToken: string
  ) => {
    try {
      const { data, errors } = await this.client.mutate({
        mutation: CmgtCheckoutMutations.updatePaymentOrderId,
        variables: {
          orderId: decoderOfRelayId(orderData.id),
          checkoutId: checkoutToken,
        },
      });

      if (errors?.length) {
        return {
          updatePaymentOrderError: errors,
        };
      }
      if (data.update_payment_payment.affected_rows > 0) {
        return {
          updatePaymentOrderData: true,
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  cmgtDeleteCheckoutlineAndGift = async (checkoutToken: string) => {
    try {
      const { data, errors } = await this.client.mutate({
        mutation: CmgtCheckoutMutations.deleteCheckoutlineAndGift,
        variables: {
          checkoutId: checkoutToken,
        },
      });

      if (errors?.length) {
        return {
          deleteCheckoutlineAndGiftError: errors,
        };
      }
      if (
        data.delete_checkout_checkout_gift_cards.affected_rows > 0 ||
        data.delete_checkout_checkoutline.affected_rows > 0
      ) {
        return {
          deleteCheckoutlineAndGiftData: true,
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  cmgtSelectPayemntIncludeCheckout = async (checkoutToken: string) => {
    let paymentWithCheckout: paymentListWithCheckout;

    try {
      const observable = this.client.watchQuery({
        query: CmgtCheckoutQueries.selectPayemntIncludeCheckout,
        variables: {
          checkoutId: checkoutToken,
        },
      });
      paymentWithCheckout = await new Promise((resolve, reject) => {
        observable.subscribe(
          result => {
            const { data, errors } = result;

            if (errors?.length) {
              reject(errors);
            } else {
              resolve(data.payment_payment_connection);
            }
          },
          error => {
            reject(error);
          }
        );
      });

      const productIdList: number[] = paymentWithCheckout.edges.map(edge => {
        return decoderOfRelayId(edge.node.id);
      });

      return {
        selecPaymentData: productIdList,
      };
    } catch (error) {
      return {
        selecPaymentError: error,
      };
    }
  };

  cmgtUpdatePaymentExceptCheckout = async (paymentIds: number[]) => {
    try {
      const { data, errors } = await this.client.mutate({
        mutation: CmgtCheckoutMutations.updatePaymentExceptCheckout,
        variables: {
          paymentIds,
        },
      });

      if (errors?.length) {
        return {
          exceptChekcoutError: errors,
        };
      }
      if (data.update_payment_payment.affected_rows > 0) {
        return {
          exceptChekcoutData: true,
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  cmgtDeleteCheckout = async (checkoutToken: string) => {
    try {
      const { data, errors } = await this.client.mutate({
        mutation: CmgtCheckoutMutations.deleteCheckout,
        variables: {
          token: checkoutToken,
        },
      });

      if (errors?.length) {
        return {
          deleteCheckoutError: errors,
        };
      }
      if (data.delete_checkout_checkout.affected_rows > 0) {
        return {
          deleteCheckoutData: true,
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  private constructCheckoutModel = ({
    id,
    token,
    email,
    shippingAddress,
    billingAddress,
    discount,
    discountName,
    voucherCode,
    lines,
    availablePaymentGateways,
    availableShippingMethods,
    shippingMethod,
  }: Checkout): ICheckoutModel => ({
    availablePaymentGateways: [
      {
        // __typename:"PaymentGateway",
        id: "mirumee.payments.dummy",
        name: "Dummy",
        config: [
          {
            // __typename:"GatewayConfigLine",
            field: "store_customer_card",
            value: "false",
          },
        ],
        currencies: ["JPY"],
      },
      {
        id: "mirumee.payments.gmocredit",
        name: "GMOCREDIT",
        config: [
          {
            field: "store_customer_card",
            value: "false",
          },
        ],
        currencies: ["JPY"],
      },
    ],
    availableShippingMethods: availableShippingMethods
      ? availableShippingMethods.filter(filterNotEmptyArrayItems)
      : [],
    billingAddress,
    email,
    id,
    lines: lines
      ?.filter(item => item?.quantity && item.variant.id)
      .map(item => {
        const itemVariant = item?.variant;

        return {
          id: item!.id,
          quantity: item!.quantity,
          totalPrice: item?.totalPrice,
          variant: {
            attributes: itemVariant?.attributes,
            id: itemVariant!.id,
            name: itemVariant?.name,
            pricing: itemVariant?.pricing,
            product: itemVariant?.product,
            quantityAvailable: itemVariant?.quantityAvailable,
            sku: itemVariant?.sku,
          },
        };
      }),
    promoCodeDiscount: {
      discount,
      discountName,
      voucherCode,
    },
    shippingAddress,
    shippingMethod,
    token,
  });

  private constructPaymentModel = ({
    id,
    gateway,
    token,
    creditCard,
    total,
  }: Payment): IPaymentModel => ({
    creditCard,
    gateway,
    id,
    token,
    total,
  });
}
