import { api } from "./api";

const ordersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMyOrders: build.query({
      query: (status = "") => ({
        url: `order/myOrders?status=${status}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    deleteUnpaidOrder: build.mutation({
      query: (id) => ({
        url: `order/delete-unpaid-order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
    getStatsOrderInDay: build.query({
      query: () => ({
        url: "order/stats-order-by-day",
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    getStatsOrdersByMethod: build.query({
      query: () => ({
        url: "order/stats-order-by-method",
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    createCheckoutOrder: build.mutation({
      query: (data) => ({
        url: `order/${data.route}`,
        method: "POST",
        body: data.data,
      }),
      invalidatesTags: ["Orders"],
    }),
    updateOrder: build.mutation({
      query: ({ orderId, ...data }) => {
        return {
          url: `order/${orderId}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["Orders"],
    }),
    updateProductInOrder: build.mutation({
      query: ({ orderId, productId, newStatus }) => ({
        url: `order/updateProductInOrder/${orderId}`,
        method: "PATCH",
        body: { productId, newStatus },
      }),
      invalidatesTags: ["Orders"],
    }),
    hideMyNotification: build.mutation({
      query: (notifId) => ({
        url: `order/hideMyNotification/${notifId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Orders"],
    }),
    getAllPendingOrders: build.query({
      query: (status) => ({
        url: `order?status=${status}&sort=-date&isPaid=true`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    getAllOrdersByProduct: build.query({
      query: (productName) => ({
        url: `order/ordersByProduct?productName=${productName}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    getAllOrders: build.query({
      query: (query = "") => ({
        url: `order${query}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
  }),
});

export const {
  useDeleteUnpaidOrderMutation,
  useGetStatsOrderInDayQuery,
  useGetStatsOrdersByMethodQuery,
  useCreateCheckoutOrderMutation,
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useHideMyNotificationMutation,
  useGetAllPendingOrdersQuery,
  useUpdateOrderMutation,
  useUpdateProductInOrderMutation,
  useGetAllOrdersByProductQuery,
  useLazyGetAllOrdersQuery,
  useGetAllOrdersQuery,
} = ordersApi;
