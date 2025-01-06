import { Outlet } from "react-router-dom";
import styles from "./Kitchen.module.css";
import ProtectedPagesHeader from "../../ui/ProtectedPagesHeader";
import { useSetTitle } from "../../hooks/useSetTitle";

function Kitchen() {
  useSetTitle("Kuchnia");

  return (
    <section className={styles.kitchen}>
      <ProtectedPagesHeader />
      <Outlet />
    </section>
  );
}

export default Kitchen;
