import { formatCurrency } from "../../utils/helpers";
import styles from "./WaiterOrderDetails.module.css";

function WaiterOrderDetails({ order }) {
  const isNotPaid =
    order.paymentMethod !== "online" && order.deliveryMethod === "odbiór";

  return (
    <div className={styles.waiterOrderDetails}>
      {order.tableNumber && <p>Stolik: {order.tableNumber}</p>}
      <p>Opłacono: {isNotPaid ? "Nie" : "Tak"}</p>
      <p>Cena: {formatCurrency(order.totalPrice)}</p>
      <p>
        Produkty:{" "}
        {order.products.map(
          (item, i) =>
            `${i === 0 ? "" : ", "}${item.quantity} ${item.product.name}`
        )}
      </p>
    </div>
  );
}

export default WaiterOrderDetails;
