import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "../../ui/ExpandMoreIcon";
import styles from "./DeliveryAccordionsContainer.module.css";
import { formatDate } from "../../utils/helpers";
import { useUpdateOrderMutation } from "../../services/orders";
import NoData from "../../ui/NoData";
import AccordionDetailsList from "./AccordionDetailsList";
import { useLocation } from "react-router-dom";
import AccordionActionButton from "../../ui/AccordionActionButton";

function DeliveryAccordionsContainer({
  ordersToDeliver,
  idDeliveryGuy,
  onSetMapView,
}) {
  const [updateOrder, { isLoading }] = useUpdateOrderMutation();
  const location = useLocation();

  const isForAll = location.pathname.endsWith("all");
  const filteredOrders = ordersToDeliver.filter((order) =>
    isForAll ? !order.idDeliveryGuy : order.idDeliveryGuy === idDeliveryGuy
  );

  function handleUpdateOrder(order) {
    updateOrder({
      orderId: order._id,
      idDeliveryGuy: order.idDeliveryGuy ? null : idDeliveryGuy,
    });
  }

  function handleOrderDelivered(order) {
    updateOrder({
      orderId: order._id,
      status: "Dostarczone",
    });
  }

  if (!filteredOrders.length) return <NoData message="Brak zamówień" />;

  return (
    <div className={styles.deliveryAccordionsContainer}>
      {filteredOrders.map((order, i) => (
        <Accordion key={order._id} sx={{ fontSize: "2.4rem" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${i + 1}-content`}
            id={`panel${i + 1}-header`}
          >
            {order.deliveryData.street}
            {order.orderOnDate ? ` (${formatDate(order.orderOnDate)})` : ""}
          </AccordionSummary>
          <AccordionDetails sx={{ fontSize: "1.6rem" }}>
            <AccordionDetailsList order={order} />
          </AccordionDetails>
          <AccordionActions sx={{ paddingRight: "2.4rem" }}>
            {!isForAll && (
              <AccordionActionButton
                onClick={() => handleOrderDelivered(order)}
                disabled={isLoading}
              >
                Dostarczono
              </AccordionActionButton>
            )}
            <AccordionActionButton
              onClick={() => handleUpdateOrder(order)}
              disabled={isLoading}
            >
              {order.idDeliveryGuy ? "Cofnij" : "Wybierz"}
            </AccordionActionButton>
            <AccordionActionButton
              onClick={() =>
                onSetMapView({
                  coords: order.deliveryData.coordinates,
                  link: `https://www.google.com/maps/search/?api=1&query=${
                    order.deliveryData.city
                  }+${order.deliveryData.street.split(" ").join("+")}+${
                    order.deliveryData.buildingNumber
                  }`,
                })
              }
            >
              Mapa
            </AccordionActionButton>
          </AccordionActions>
        </Accordion>
      ))}
    </div>
  );
}

export default DeliveryAccordionsContainer;
