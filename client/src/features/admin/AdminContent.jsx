import styles from "./AdminContent.module.css";
import AdminSideNav from "./AdminSideNav";

function AdminContent({ children }) {
  return (
    <div className={styles.adminContent}>
      <AdminSideNav />
      {children}
    </div>
  );
}

export default AdminContent;
