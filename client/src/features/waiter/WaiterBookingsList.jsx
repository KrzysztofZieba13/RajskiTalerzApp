import styles from "./WaiterBookingsList.module.css";
import ButtonUnderline from "../../ui/ButtonUnderline";
import { Divider } from "@mui/material";
import {
  useGetAllBookingsQuery,
  useUpdateBookingMutation,
} from "../../services/bookings";
import Spinner from "../../ui/Spinner";
import { formatDate } from "../../utils/helpers";
import { useState } from "react";
import { useSetTitle } from "../../hooks/useSetTitle";

function WaiterBookingsList() {
  useSetTitle("Zarządzanie Rezerwacjami");
  const {
    data: resPendingBookings,
    isLoading: isLoadingPendingBookings,
    isFetching,
  } = useGetAllBookingsQuery("?status=Oczekiwanie");
  const [updateBooking, { isLoading: isUpdating }] = useUpdateBookingMutation();
  const [updatedBookingId, setUpdatedBookingId] = useState(null);

  if (isLoadingPendingBookings) return <Spinner />;
  const pendingOrders = resPendingBookings.data;

  function handleUpdateBooking(bookingId, newStatus) {
    updateBooking({ bookingId, data: { status: newStatus } });
    setUpdatedBookingId(bookingId);
  }

  const isUpdatingBooking = isUpdating || isFetching;

  return (
    <ul>
      {pendingOrders.map((booking, i) => (
        <li className={styles.list} key={booking._id}>
          <div className={styles.panelList}>
            {updatedBookingId === booking._id && isUpdatingBooking ? (
              "Aktualizacja"
            ) : (
              <>
                {formatDate(booking.bookingDate)} Stolik: {booking.guestsNumber}
                <div className={styles.actionButtons}>
                  <ButtonUnderline
                    color="#219c90"
                    onClick={() =>
                      handleUpdateBooking(booking._id, "Zatwierdzono")
                    }
                  >
                    Zatwierdź
                  </ButtonUnderline>
                  <ButtonUnderline
                    color="#ee4e4e"
                    onClick={() =>
                      handleUpdateBooking(booking._id, "Odrzucono")
                    }
                  >
                    Anuluj
                  </ButtonUnderline>
                </div>
              </>
            )}
          </div>
          {pendingOrders.length !== i + 1 && <Divider />}
        </li>
      ))}
    </ul>
  );
}

export default WaiterBookingsList;
