import styles from "./WaiterBookings.module.css";
import WaiterBookingsList from "./WaiterBookingsList";
import WaiterSearchBookings from "./WaiterSearchBookings";

function WaiterBookings() {
  return (
    <div className={styles.waiterBookings}>
      <WaiterBookingsList />
      <WaiterSearchBookings />
    </div>
  );
}

export default WaiterBookings;
