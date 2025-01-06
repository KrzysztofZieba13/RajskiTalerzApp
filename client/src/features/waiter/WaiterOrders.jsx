import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import styles from "./WaiterOrders.module.css";
import ExpandMoreIcon from "../../ui/ExpandMoreIcon";
import {
  useGetAllPendingOrdersQuery,
  useUpdateOrderMutation,
} from "../../services/orders";
import Spinner from "../../ui/Spinner";
import WaiterOrderDetails from "./WaiterOrderDetails";
import AccordionActionButton from "../../ui/AccordionActionButton";
import { useSetTitle } from "../../hooks/useSetTitle";

function WaiterOrders() {
  useSetTitle("Zarządzanie Zamówieniami");
  const { data: orders, isLoading } = useGetAllPendingOrdersQuery(
    "W+drodze&deliveryMethod[ne]=dostawa"
  );
  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();

  if (isLoading) return <Spinner />;

  console.log(orders);
  return (
    <div className={styles.waiterOrders}>
      {orders.data.map((order) => (
        <Accordion sx={{ fontSize: "2.4rem" }} key={order._id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            {order.deliveryMethod === "stolik" ? "Do stolika" : "Odbiór"}
          </AccordionSummary>
          <AccordionDetails sx={{ fontSize: "1.6rem" }}>
            <WaiterOrderDetails order={order} />
          </AccordionDetails>
          <AccordionActions sx={{ paddingRight: "2.4rem" }}>
            <AccordionActionButton
              onClick={() =>
                updateOrder({ orderId: order._id, status: "Dostarczone" })
              }
              disabled={isUpdating}
            >
              Wydano
            </AccordionActionButton>
          </AccordionActions>
        </Accordion>
      ))}
    </div>
  );
}

export default WaiterOrders;
