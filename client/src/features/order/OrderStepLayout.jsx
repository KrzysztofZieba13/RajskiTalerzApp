import styles from "./OrderStepLayout.module.css";

function OrderStepLayout({ children }) {
  return <div className={styles.orderStepLayout}>{children}</div>;
}

export default OrderStepLayout;
