import { useQuery } from "@tanstack/react-query";
import api from "../utils/api"; // Adjust the import based on your project structure

// Define a fetch function for the margin padding by ID
const fetchMarginPadding = async (id: string) => {
  const { data } = await api.get(`margin-padding/${id}`);
  return data;
};

// Custom hook using React Query
export const useMarginPadding = (id: string) => {
  return useQuery({
    queryKey: ["marginPadding", id], // Including the id in the query key for caching
    queryFn: () => fetchMarginPadding(id), // Fetching margin padding details
    staleTime: 1000 * 60 * 5, // Optional: keeps data fresh for 5 minutes
    cacheTime: 1000 * 60 * 10, // Optional: cache for 10 minutes
    enabled: !!id, // Only run the query if the id is defined
  });
};
