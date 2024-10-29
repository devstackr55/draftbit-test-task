import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import { useToast } from "../context/ToastContext";

const fetchLayoutSettings = async () => {
  const { data } = await api.get("layout-settings");
  return data;
};

export const useLayoutSettings = () => {
  const { success, error } = useToast();

  return useQuery({
    queryKey: ["layoutSettings"],
    queryFn: fetchLayoutSettings,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    onSuccess: (data) => {
      success("Layout settings fetched successfully!");
    },
    onError: (err: any) => {
      error(
        `Failed to fetch layout settings: ${err.message || "Unknown error"}`
      );
    },
  });
};
