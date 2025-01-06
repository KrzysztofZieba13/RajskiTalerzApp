import { api } from "./api";

const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    createEmployee: build.mutation({
      query: ({ ...data }) => ({
        url: "users/create-employee",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    signup: build.mutation({
      query: ({ ...data }) => ({
        url: "users/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    login: build.mutation({
      query: (data) => ({
        url: "users/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User", "Orders", "Bookings"],
    }),
    logout: build.mutation({
      query: () => ({
        url: "users/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    isLoggedIn: build.query({
      query: () => ({
        url: "users/isLoggedIn",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useCreateEmployeeMutation,
  useSignupMutation,
  useLogoutMutation,
  useIsLoggedInQuery,
  useLoginMutation,
} = usersApi;
