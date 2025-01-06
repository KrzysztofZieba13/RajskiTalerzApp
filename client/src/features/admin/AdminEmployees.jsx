import styles from "./AdminEmployees.module.css";
import AdminAddEmployeeContainer from "./AdminAddEmployeeContainer";
import AdminDeleteEmployeeContainer from "./AdminDeleteEmployeeContainer";

function AdminEmployees() {
  return (
    <div className={styles.adminEmployees}>
      <AdminAddEmployeeContainer />
      <AdminDeleteEmployeeContainer />
    </div>
  );
}

export default AdminEmployees;
