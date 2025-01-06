import { Outlet } from "react-router-dom";
import styles from "./Admin.module.css";
import AdminContent from "./AdminContent";
import ProtectedPagesHeader from "../../ui/ProtectedPagesHeader";
import { useSetTitle } from "../../hooks/useSetTitle";

function Admin() {
  useSetTitle("Admin");

  return (
    <section className={styles.admin}>
      {/* <AdminHeader /> */}
      <ProtectedPagesHeader />
      <AdminContent>
        <Outlet />
      </AdminContent>
    </section>
  );
}

export default Admin;
