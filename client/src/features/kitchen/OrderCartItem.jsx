import styles from "./OrderCartItem.module.css";

function OrderCartItem({ item, onUpdate }) {
  return (
    <div
      className={`${styles.orderCartItem} ${item.isReady && styles.itemDone}`}
      onClick={() => onUpdate(item.product.id, !item.isReady)}
    >
      <div className={styles.orderCartInfo}>
        <span>{item.quantity}</span>
        <p>{item.product.name}</p>
      </div>
      <div className={styles.comment}>{item.comment}</div>
    </div>
  );
}

export default OrderCartItem;
