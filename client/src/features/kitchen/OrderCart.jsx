import styles from "./OrderCart.module.css";
import OrderCartContent from "./OrderCartContent";
import OrderCartHeader from "./OrderCartHeader";

function OrderCart({ order, isUpdating }) {
  return (
    <div
      className={`${styles.orderCart} ${
        order.status === "Gotowe" ? styles.orderReady : ""
      }`}
    >
      <OrderCartHeader order={order} />
      <OrderCartContent isUpdating={isUpdating} order={order} />
    </div>
  );
}

export default OrderCart;
