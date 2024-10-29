import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import api from "utils/api";

// Define a fetch function for the layout settings
const fetchLayoutSettings = async () => {
  const { data } = await api.get("layout-settings");
  return data;
};

// Custom hook using React Query
export const useLayoutSettings = () => {
  return useQuery({
    queryKey: ["layoutSettings"],
    queryFn: fetchLayoutSettings,
    staleTime: 1000 * 60 * 5, // Optional: keeps data fresh for 5 minutes
    cacheTime: 1000 * 60 * 10, // Optional: cache for 10 minutes
  });
};
