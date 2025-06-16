import { useAuth0 } from "@auth0/auth0-react";

export const useMyAuth = () => {
  const { isLoading, ...rest } = useAuth0();
  return {
    ...rest,
    isPending: isLoading, // rename here
  };
};
