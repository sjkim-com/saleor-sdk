import {
  ApolloClient,
  MutationOptions as ApolloMutationOptions,
} from "apollo-client";

import * as Address from "./address";
import * as CmgtMutation from "./cmgtCheckout";
import * as User from "./user";

import {
  DeleteUserAddress,
  DeleteUserAddressVariables,
} from "./gqlTypes/DeleteUserAddress";

import {
  CreateUserAddress,
  CreateUserAddressVariables,
  CreateUserAddressCmgt,
  CreateUserAddressVariablesCmgt,
  SelectUserAddressVariablesCmgt,
  SelectUserAddressCmgt,
} from "./gqlTypes/CreateUserAddress";

import {
  SetCustomerDefaultAddress,
  SetCustomerDefaultAddressVariables,
} from "./gqlTypes/SetCustomerDefaultAddress";

import {
  UpdateUserAddress,
  UpdateUserAddressVariables,
} from "./gqlTypes/UpdateUserAddress";

import { SetPassword, SetPasswordVariables } from "./gqlTypes/SetPassword";

import {
  PasswordChange,
  PasswordChangeVariables,
} from "./gqlTypes/PasswordChange";

import {
  AccountUpdate,
  AccountUpdateVariables,
} from "./gqlTypes/AccountUpdate";

// CMGT用
import * as CmgtUser from "./cmgtUser";
import {
  CmgtAccountUpdate,
  CmgtAccountUpdateVariables,
} from "./gqlTypes/CmgtAccountUpdate";

export type MutationOptions<TData, TVariables> = Omit<
  ApolloMutationOptions<TData, TVariables>,
  "mutation"
>;

// TODO: Add ability to pass custom fragments to mutations
export const MUTATIONS = {
  AccountUpdate: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<AccountUpdate, AccountUpdateVariables>
  ) =>
    client.mutate({
      mutation: User.accountUpdate,
      ...options,
    }),
  AddressTypeUpdate: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      SetCustomerDefaultAddress,
      SetCustomerDefaultAddressVariables
    >
  ) =>
    client.mutate({
      mutation: Address.setCustomerDefaultAddress,
      ...options,
    }),

  CmgtAccountUpdate: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<CmgtAccountUpdate, CmgtAccountUpdateVariables>
  ) =>
    client.mutate({
      mutation: CmgtUser.cmgtAccountUpdate,
      ...options,
    }),

  CreateUserAddress: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<CreateUserAddress, CreateUserAddressVariables>
  ) =>
    client.mutate({
      mutation: Address.createUserAddress,
      ...options,
    }),

  cmgtCreateUserAddress: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      CreateUserAddressCmgt,
      CreateUserAddressVariablesCmgt
    >
  ) =>
    client.mutate({
      mutation: CmgtMutation.createAddressMutationRelay,
      variables: {
        addressObject: {
          first_name: options.variables?.addressObject.firstName,
          last_name: options.variables?.addressObject.firstName,
          company_name: options.variables?.addressObject.companyName,
          street_address_1: options.variables?.addressObject.streetAddress1,
          street_address_2: options.variables?.addressObject.streetAddress2,
          postal_code: options.variables?.addressObject.postalCode,
          country_area: options.variables?.addressObject.countryArea,
          country: "JP",
          city: options.variables?.addressObject.city,
          city_area: "",
        },
      },
    }),

  cmgtSelectUserAddress: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      SelectUserAddressCmgt,
      SelectUserAddressVariablesCmgt
    >
  ) =>
    client.mutate({
      mutation: CmgtMutation.selectUserAddress,
      ...options,
    }),

  DeleteUserAddress: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<DeleteUserAddress, DeleteUserAddressVariables>
  ) =>
    client.mutate({
      mutation: Address.deleteUserAddress,
      ...options,
    }),
  PasswordChange: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<PasswordChange, PasswordChangeVariables>
  ) =>
    client.mutate({
      mutation: User.changeUserPassword,
      ...options,
    }),
  SetPassword: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<SetPassword, SetPasswordVariables>
  ) =>
    client.mutate({
      mutation: User.setPassword,
      ...options,
    }),
  UpdateUserAddress: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<UpdateUserAddress, UpdateUserAddressVariables>
  ) =>
    client.mutate({
      mutation: Address.updateUserAddress,
      ...options,
    }),
};

export type MUTATIONS = typeof MUTATIONS;
