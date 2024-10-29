import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api";

// Define the type for the SpacingConfig if you haven't already

const updateMarginPadding = async (newConfig: any) => {
  const marginPaddingId = newConfig.marginPaddingId; // Extract the ID from the newConfig
  const response = await api.put(
    `margin-padding/${marginPaddingId}`,
    newConfig
  );
  return response.data; // Return the updated data
};

// Create the custom hook
export const useUpdateMarginPadding = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMarginPadding,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["marginPadding"],
      }); // Invalidate queries after a successful update
    },
  });
};
