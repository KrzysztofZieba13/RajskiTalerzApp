import { Outlet } from "react-router-dom";
import UserDashboardSideNav from "./UserDashboardSideNav";
import styles from "./UserDashboard.module.css";

function UserDashboard() {
  return (
    <section className={styles.dashboard}>
      <UserDashboardSideNav />
      <Outlet />
    </section>
  );
}

export default UserDashboard;
