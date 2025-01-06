import KitchenOrders from "./KitchenOrders";
import KitchenSideBar from "./KitchenSideBar";
import styles from "./KitchenContent.module.css";

function KitchenContent() {
  return (
    <div className={styles.kitchenContent}>
      <KitchenSideBar />
      <KitchenOrders />
    </div>
  );
}

export default KitchenContent;
