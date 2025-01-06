import { useSetTitle } from "../../hooks/useSetTitle";
import UserCredentialsUpdate from "./UserCredentialsUpdate";
import styles from "./UserData.module.css";
import UserDataCredentials from "./UserDataCredentials";

function UserData() {
  useSetTitle("Dane użytkownika");

  return (
    <div className={styles.userData}>
      <UserDataCredentials />
      <UserCredentialsUpdate />
    </div>
  );
}

export default UserData;
