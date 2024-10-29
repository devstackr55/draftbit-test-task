import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import { useToast } from "../context/ToastContext";

const fetchMarginPadding = async (id: string) => {
  const { data } = await api.get(`margin-padding/${id}`);
  return data;
};

export const useMarginPadding = (id: string) => {
  const { success, error } = useToast();

  return useQuery({
    queryKey: ["marginPadding", id],
    queryFn: () => fetchMarginPadding(id),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    enabled: !!id,
    onSuccess: (data) => {
      // success("Margin padding data fetched successfully!");
    },
    onError: (err: any) => {
      error(
        `Failed to fetch margin padding: ${err.message || "Unknown error"}`
      );
    },
  });
};
