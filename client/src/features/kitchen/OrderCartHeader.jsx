import { useLocation } from "react-router-dom";
import { useUpdateOrderMutation } from "../../services/orders";
import { formatDate } from "../../utils/helpers";
import styles from "./OrderCartHeader.module.css";

function OrderCartHeader({ order }) {
  const location = useLocation();
  const [updateOrder] = useUpdateOrderMutation();
  const finishedOrders = order.products.reduce((acc, curVal) => {
    if (curVal.isReady) return acc + 1;
    return acc;
  }, 0);
  const orderMaxLength = order.products.length;
  const allProductsReady = finishedOrders === orderMaxLength;
  const orderPriority = order.orderOnDate
    ? formatDate(order.orderOnDate)
    : order.orderPriority.toUpperCase();

  function handleUpdateOrder() {
    if (allProductsReady)
      updateOrder({ orderId: order._id, status: "W drodze" });
  }

  const isPageWithOrdersReady = location.search === "?status=Gotowe";

  return (
    <div
      className={`${styles.orderCartHeader} ${
        allProductsReady ? styles.orderReadyForDelivery : ""
      }`}
      onClick={handleUpdateOrder}
    >
      <div className={styles.orderCartHeaderRow}>
        <p className={styles.firstRow}>
          {order.clientData.name.split(" ").at(0)}
        </p>
        <p className={styles.firstRow}>{order.deliveryMethod}</p>
      </div>
      <div className={styles.orderCartHeaderRow}>
        <p className={styles.secondRow}>{orderPriority}</p>
        <p className={styles.secondRow}>{order.employee}</p>
      </div>
      <div className={styles.counter}>
        {allProductsReady ? "Gotowe" : `${finishedOrders}/${orderMaxLength}`}
      </div>
      {isPageWithOrdersReady && (
        <div className={styles.orderReadyButton}>Gotowe!</div>
      )}
    </div>
  );
}

export default OrderCartHeader;
