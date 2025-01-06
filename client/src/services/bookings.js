import { api } from "./api";

const bookingApi = api.injectEndpoints({
  endpoints: (build) => ({
    createBooking: build.mutation({
      query: (booking) => ({
        url: "bookings",
        method: "POST",
        body: booking,
      }),
      invalidatesTags: ["Bookings"],
    }),
    getAllBookings: build.query({
      query: (queryString = "") => ({
        url: `bookings${queryString}`,
        method: "GET",
      }),
      providesTags: ["Bookings"],
    }),
    updateBooking: build.mutation({
      query: ({ bookingId, data }) => ({
        url: `bookings/${bookingId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Bookings"],
    }),
    getMyBookings: build.query({
      query: (onlyVisibleNotifications) => ({
        url: `bookings/myBookings?${
          onlyVisibleNotifications ? "isVisibleNotification=true" : ""
        }`,
        method: "GET",
      }),
      providesTags: ["Bookings"],
    }),
    hideMyBookingNotification: build.mutation({
      query: (notifId) => ({
        url: `bookings/hideMyNotification/${notifId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Bookings"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetMyBookingsQuery,
  useHideMyBookingNotificationMutation,
  useGetAllBookingsQuery,
  useLazyGetAllBookingsQuery,
  useUpdateBookingMutation,
} = bookingApi;
