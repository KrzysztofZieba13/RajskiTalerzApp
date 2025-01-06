import { memo } from "react";
import PanelLayout from "../../ui/PanelLayout";
import styles from "./Notification.module.css";
import NotificationItem from "./NotificationItem";
import { useGetMyOrdersQuery } from "../../services/orders";
import Spinner from "../../ui/Spinner";
import { useGetMyBookingsQuery } from "../../services/bookings";

const Notification = memo(function Notification({ isOpen, handleHide }) {
  const { data: orders, isLoading: isLoadingOrders } = useGetMyOrdersQuery(
    "W drodze,Gotowe,W realizacji&isVisibleNotification=true"
  );
  const { data: bookings, isLoading: isLoadingBookings } =
    useGetMyBookingsQuery(true);

  const notifications = [...(bookings?.data || []), ...(orders?.data || [])];
  notifications.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <PanelLayout isOpen={isOpen} handleHide={handleHide}>
      <div className={styles.notifications}>
        {isLoadingOrders || isLoadingBookings ? (
          <Spinner />
        ) : (
          notifications.map((notif) => (
            <NotificationItem
              key={notif._id}
              category={notif.bookingDate ? "booking" : "order"}
              notification={notif}
            />
          ))
        )}
      </div>
    </PanelLayout>
  );
});

export default Notification;
