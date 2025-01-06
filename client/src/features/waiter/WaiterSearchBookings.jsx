import { useSearchParams } from "react-router-dom";
import { useLazyGetAllBookingsQuery } from "../../services/bookings";
import SelectAndSearch from "../../ui/SelectAndSearch";
import WaiterBookingsResults from "./WaiterBookingsResults";
import styles from "./WaiterSearchBookings.module.css";
import dayjs from "dayjs";

function WaiterSearchBookings() {
  const [getBookings, { data: bookingsResponse, isLoading }] =
    useLazyGetAllBookingsQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("date"));

  function handleSubmit(e) {
    e.preventDefault();
    getBookings(
      `?bookingDate[gte]=${searchParams.get("date")}&bookingDate[lte]=${dayjs(
        searchParams.get("date")
      )
        .add(1, "day")
        .format("YYYY-MM-DD")}&status=Zatwierdzono&sort=-guestsNumber`
    );
  }

  return (
    <div className={styles.waiterSearchBookings}>
      <SelectAndSearch onSubmit={handleSubmit} />
      <WaiterBookingsResults
        bookingsRes={bookingsResponse}
        isLoading={isLoading}
      />
    </div>
  );
}

export default WaiterSearchBookings;
