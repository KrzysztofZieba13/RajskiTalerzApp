import { Outlet } from "react-router-dom";
import styles from "./Delivery.module.css";
import ProtectedPagesHeader from "../../ui/ProtectedPagesHeader";
import { useSetTitle } from "../../hooks/useSetTitle";

function Delivery() {
  useSetTitle("Profil Dostawcy");

  return (
    <section className={styles.delivery}>
      <ProtectedPagesHeader />
      <Outlet />
    </section>
  );
}

export default Delivery;
