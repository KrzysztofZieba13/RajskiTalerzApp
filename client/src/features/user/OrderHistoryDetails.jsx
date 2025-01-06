import { useState } from "react";
import styles from "./OrderHistoryDetails.module.css";

function OrderHistoryDetails({ order }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={styles.orderHistoryDetails}>
      <p className={styles.products}>
        Zamówienie:{" "}
        {order.products.map(
          (item, i) =>
            `${i === 0 ? "" : ", "}${item.quantity} ${item.product.name}`
        )}
      </p>
    </div>
  );
}

export default OrderHistoryDetails;
