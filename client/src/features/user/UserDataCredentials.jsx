import { Link } from "react-router-dom";
import styles from "./UserDataCredentials.module.css";
import { useIsLoggedInQuery } from "../../services/auth";
import Spinner from "../../ui/Spinner";

function UserDataCredentials() {
  const { data: userRes, isLoading: isCheckingUser } = useIsLoggedInQuery();

  if (isCheckingUser) return <Spinner />;
  const user = userRes.user;

  return (
    <div className={styles.userCredentials}>
      <div className={styles.userCred}>
        <p>Imię</p>
        <div>
          <p className={styles.userCurrentCredential}>{user.name}</p>
          <Link to="update-name">Zmień</Link>
        </div>
      </div>
      <div className={styles.userCred}>
        <p>Nazwisko</p>
        <div>
          <p className={styles.userCurrentCredential}>{user.surname}</p>
          <Link to="update-surname">Zmień</Link>
        </div>
      </div>
      <div className={styles.userCred}>
        <p>Email</p>
        <div>
          <p className={styles.userCurrentCredential}>{user.email}</p>
          <Link to="update-email">Zmień</Link>
        </div>
      </div>
      <div className={styles.userCred}>
        <p>Hasło</p>
        <div>
          <p className={styles.userCurrentCredential}>*************</p>
          <Link to="update-password">Zmień</Link>
        </div>
      </div>
    </div>
  );
}

export default UserDataCredentials;
