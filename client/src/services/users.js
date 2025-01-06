import { api } from "./api";

const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    resetPassword: build.mutation({
      query: (data) => ({
        url: `users/resetPassword/${data.token}`,
        method: "POST",
        body: data.data,
      }),
      invalidatesTags: ["User"],
    }),
    forgotPassword: build.mutation({
      query: (data) => ({
        url: "users/forgotPassword",
        method: "POST",
        body: data,
      }),
    }),
    updateMyPassword: build.mutation({
      query: (data) => ({
        url: "users/updateMyPassword",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    updateMe: build.mutation({
      query: (data) => ({
        url: "users/updateMe",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    deleteEmployee: build.mutation({
      query: (id) => ({
        url: `users/employee/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    getAllEmployees: build.query({
      query: () => ({
        url: "users?role[ne]=client",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    addProductToFavourites: build.mutation({
      query: (id) => ({
        url: `users/favourites/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
    deleteProductFromFavourites: build.mutation({
      query: (id) => ({
        url: `users/favourites/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useResetPasswordMutation,
  useForgotPasswordMutation,
  useUpdateMyPasswordMutation,
  useUpdateMeMutation,
  useDeleteEmployeeMutation,
  useGetAllEmployeesQuery,
  useAddProductToFavouritesMutation,
  useDeleteProductFromFavouritesMutation,
} = usersApi;
