import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../utils/api";

import { useToast } from "../context/ToastContext";

const updateMarginPadding = async (data: any) => {
  console.log(data);
  const { marginPaddingId, newConfig } = data;
  const response = await api.put(
    `margin-padding/${marginPaddingId}`,
    newConfig
  );
  return response.data;
};

export const useUpdateMarginPadding = () => {
  const queryClient = useQueryClient();
  const { success, error } = useToast();

  return useMutation({
    mutationFn: updateMarginPadding,
    onSuccess: () => {
      success("Margin padding updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["marginPadding"] }); // Invalidate queries after a successful update
    },
    onError: (err: any) => {
      error(
        `Failed to update margin padding: ${
          err.response?.data?.message || "Unknown error"
        }`
      );
    },
  });
};
