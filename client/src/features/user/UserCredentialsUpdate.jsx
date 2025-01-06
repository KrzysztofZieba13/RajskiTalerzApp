import { Outlet } from "react-router-dom";
import styles from "./UserCredentialsUpdate.module.css";

function UserCredentialsUpdate() {
  return (
    <div className={styles.userCredentialsUpdate}>
      <Outlet />
    </div>
  );
}

export default UserCredentialsUpdate;
