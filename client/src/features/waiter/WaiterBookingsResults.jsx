import Spinner from "../../ui/Spinner";
import { formatDate } from "../../utils/helpers";
import styles from "./WaiterBookingsResults.module.css";

function WaiterBookingsResults({ bookingsRes, isLoading }) {
  if (isLoading) return <Spinner />;

  const bookings = bookingsRes?.data || [];

  if (bookings.length === 0) return;
  console.log(bookings);
  return (
    <div className={styles.waiterBookingsResults}>
      <div className={styles.resultsHeader}>
        <div>Stolik</div>
        <div>Data</div>
        <div>Komentarz</div>
      </div>
      {bookings.map((booking) => (
        <div className={styles.resultsRow} key={booking._id}>
          <div>osoby: {booking.guestsNumber}</div>
          <div>{formatDate(booking.bookingDate)}</div>
          <div>{booking.bookingComment}</div>
        </div>
      ))}
    </div>
  );
}

export default WaiterBookingsResults;
