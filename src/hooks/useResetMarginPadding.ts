// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import api from "../utils/api"; // Adjust the import based on your project structure

// const resetMarginPadding = async (data: any) => {
//   const id = data.marginPaddingId;
//   const config = data.newConfig;
//   const response = await api.put(`margin-paddings/${id}`, { config }); // Adjust API endpoint as necessary
//   return response.data; // Return the response data if needed
// };

// export const useResetMarginPadding = () => {
//   const queryClient = useQueryClient();
//   // const { success, error } = useToast();

//   return useMutation({
//     mutationFn: resetMarginPadding,
//     onSuccess: () => {
//       // handleSuccess();
//       queryClient.invalidateQueries({ queryKey: ["marginPaddings"] }); // Invalidate queries to refresh data
//     },
//     onError: () => {
//       // handleError();
//     },
//   });
// };
