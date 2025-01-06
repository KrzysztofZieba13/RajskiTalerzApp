import { Outlet } from "react-router-dom";
import styles from "./Waiter.module.css";
import ProtectedPagesHeader from "../../ui/ProtectedPagesHeader";

function Waiter() {
  return (
    <section className={styles.waiter}>
      <ProtectedPagesHeader />
      <Outlet />
    </section>
  );
}

export default Waiter;
