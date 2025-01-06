import { memo } from "react";
import styles from "./OrderProgressBar.module.css";
import { useSelector } from "react-redux";

const OrderProgressBar = memo(function OrderProgressBar() {
  const newOrderStep = useSelector((state) => state.order.newOrderStep);

  return (
    <div className={styles.steps}>
      <div className={styles.step}>
        <div
          className={`${styles.stepCircle} ${
            newOrderStep >= 1 ? styles.stepCircleVisited : ""
          }`}
        >
          1
        </div>
        <p className={styles.stepName}>Sposób dostawy</p>
      </div>
      <div
        className={`${styles.stepLine} ${
          newOrderStep >= 2 ? styles.stepLineActive : ""
        }`}
      ></div>
      <div className={styles.step}>
        <div
          className={`${styles.stepCircle} ${
            newOrderStep >= 2 ? styles.stepCircleVisited : ""
          }`}
        >
          2
        </div>
        <p className={styles.stepName}>Szczegóły zamówienia</p>
      </div>
      <div
        className={`${styles.stepLine} ${
          newOrderStep >= 3 ? styles.stepLineActive : ""
        }`}
      ></div>
      <div className={styles.step}>
        <div
          className={`${styles.stepCircle} ${
            newOrderStep >= 3 ? styles.stepCircleVisited : ""
          }`}
        >
          3
        </div>
        <p className={styles.stepName}>Twoje dane</p>
      </div>
      <div
        className={`${styles.stepLine} ${
          newOrderStep >= 4 ? styles.stepLineActive : ""
        }`}
      ></div>
      <div className={styles.step}>
        <div
          className={`${styles.stepCircle} ${
            newOrderStep >= 4 ? styles.stepCircleVisited : ""
          }`}
        >
          4
        </div>
        <p className={styles.stepName}>Płatność</p>
      </div>
    </div>
  );
});

export default OrderProgressBar;
