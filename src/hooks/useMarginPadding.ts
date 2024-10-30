import { useQuery } from "@tanstack/react-query";

import api from "../utils/api";

const fetchMarginPadding = async (id: string) => {
  const { data } = await api.get(`margin-padding/${id}`);
  return data;
};

export const useMarginPadding = (id: string) => {
  return useQuery({
    queryKey: ["marginPadding", id],
    queryFn: () => fetchMarginPadding(id),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    enabled: !!id,
  });
};
