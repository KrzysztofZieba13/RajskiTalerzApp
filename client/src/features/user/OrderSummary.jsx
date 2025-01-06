import { useState } from "react";
import ButtonUnderline from "../../ui/ButtonUnderline";
import { formatCurrency, formatDate } from "../../utils/helpers";
import OrderHistoryDetails from "./OrderHistoryDetails";
import styles from "./OrderSummary.module.css";

function OrderSummary({ order }) {
  const [isDetailsShow, setIsDetailsShow] = useState(false);

  return (
    <div className={styles.orderSummary}>
      <div className={styles.orderSummaryHeader}>
        <p>{formatDate(order.date)}</p>
        <p className={styles.cost}>{formatCurrency(order.totalPrice)}</p>
        <ButtonUnderline onClick={() => setIsDetailsShow((is) => !is)}>
          {isDetailsShow ? "Ukryj" : "Zobacz"}
        </ButtonUnderline>
      </div>
      {isDetailsShow && <OrderHistoryDetails order={order} />}
    </div>
  );
}

export default OrderSummary;
