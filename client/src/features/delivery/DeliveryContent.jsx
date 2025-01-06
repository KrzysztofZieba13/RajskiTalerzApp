import { NavLink } from "react-router-dom";
import { useIsLoggedInQuery } from "../../services/auth";
import { useGetAllOrdersQuery } from "../../services/orders";
import Spinner from "../../ui/Spinner";
import DeliveryAccordionsContainer from "./DeliveryAccordionsContainer";
import styles from "./DeliveryContent.module.css";
import DeliveryRoute from "./DeliveryRoute";
import { useState } from "react";

function DeliveryContent() {
  const [coords, setCoords] = useState(null);
  const [link, setLink] = useState(null);
  const { data: orders, isLoading } = useGetAllOrdersQuery(
    "?status=W+drodze&deliveryMethod=dostawa"
  );
  const { data, isLoading: isCheckingUser } = useIsLoggedInQuery();
  if (isLoading || isCheckingUser) return <Spinner />;

  const idDeliveryGuy = data.user._id;

  function handleSetMapView(data) {
    setCoords(data.coords);
    setLink(data.link);
  }

  return (
    <div className={styles.deliveryContent}>
      <div>
        <div className={styles.sortedOrdersToDeliver}>
          <NavLink
            className={styles.sortedOrdersToDeliverBtn}
            to="/delivery/all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path d="M2 4.5A2.5 2.5 0 0 1 4.5 2h11a2.5 2.5 0 0 1 0 5h-11A2.5 2.5 0 0 1 2 4.5ZM2.75 9.083a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5H2.75ZM2.75 12.663a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5H2.75ZM2.75 16.25a.75.75 0 0 0 0 1.5h14.5a.75.75 0 1 0 0-1.5H2.75Z" />
            </svg>
            Wszystkie
          </NavLink>
          <NavLink
            className={styles.sortedOrdersToDeliverBtn}
            to="/delivery/yours"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path d="M6.5 3c-1.051 0-2.093.04-3.125.117A1.49 1.49 0 0 0 2 4.607V10.5h9V4.606c0-.771-.59-1.43-1.375-1.489A41.568 41.568 0 0 0 6.5 3ZM2 12v2.5A1.5 1.5 0 0 0 3.5 16h.041a3 3 0 0 1 5.918 0h.791a.75.75 0 0 0 .75-.75V12H2Z" />
              <path d="M6.5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM13.25 5a.75.75 0 0 0-.75.75v8.514a3.001 3.001 0 0 1 4.893 1.44c.37-.275.61-.719.595-1.227a24.905 24.905 0 0 0-1.784-8.549A1.486 1.486 0 0 0 14.823 5H13.25ZM14.5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
            </svg>
            Twoje
          </NavLink>
        </div>
        <DeliveryAccordionsContainer
          ordersToDeliver={orders.data}
          idDeliveryGuy={idDeliveryGuy}
          onSetMapView={handleSetMapView}
        />
      </div>
      <DeliveryRoute coords={coords} link={link} />
    </div>
  );
}

export default DeliveryContent;
