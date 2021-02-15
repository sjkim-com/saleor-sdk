import { mutationFactory } from "./useMutation";

// Address mutations
export const useDefaultUserAddress = mutationFactory("setUserDefaultAddress");
export const useDeleteUserAddresss = mutationFactory("setDeleteUserAddress");
export const useCreateUserAddress = mutationFactory("setCreateUserAddress");
export const cmgtUseCreateUserAddress = mutationFactory(
  "cmgtSetCreateUserAddress"
);
export const cmgtSelectUserAddress = mutationFactory(
  "cmgtSetSelectUserAddress"
);
export const useUpdateUserAddress = mutationFactory("setUpdateuserAddress");

// User mutations
export const usePasswordChange = mutationFactory("setPasswordChange");
export const useAccountUpdate = mutationFactory("setAccountUpdate");

export const useSetPassword = mutationFactory("setPassword");
