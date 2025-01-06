import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3200/api/v1/",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = Cookies.get("jwt");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["User", "Orders", "Bookings", "Products"],
  endpoints: () => ({}),
});
