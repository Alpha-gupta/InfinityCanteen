import type { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
 import { toast } from "sonner"; // Uncomment if using toast notifications

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
     if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json();
  };

  const {
    data: currentUser,
    isPending,
    error,
  } = useQuery({
  queryKey: ["fetchCurrentUser"],  
  queryFn: getMyUserRequest
});
  if (error) {
    toast.error(error.toString());
  }

  return { currentUser, isPending };
};




type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequest = async (user: CreateUserRequest): Promise<void> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };

  const {
    mutateAsync: createUser,
    isPending,
    isError,
    isSuccess,
  } = useMutation<void, Error, CreateUserRequest>({
    mutationFn: createMyUserRequest,
  });

  return {
    createUser,
    isPending,
    isError,
    isSuccess,
  };
};

type UpdateMyUserRequest = {
  name: string;
  phoneNumber: string;
  roomNumber: string;
  HostelName: string;
  College: string;
};

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserRequest = async (
    formData: UpdateMyUserRequest
  ): Promise<void> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }
  };

  const {
    mutateAsync: updateUser,
    isPending,
    isSuccess,
    error,
    reset,
  } = useMutation<void, Error, UpdateMyUserRequest>({
    mutationFn: updateMyUserRequest,
  });

  
  if (isSuccess) {
    toast.success("User profile updated!");
  }
  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { 
    updateUser, 
    isPending, 
 
  };
};