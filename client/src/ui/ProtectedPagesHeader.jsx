import { Link } from "react-router-dom";
import { useHandleMutation } from "../hooks/useHandleMutation";
import { useIsLoggedInQuery, useLogoutMutation } from "../services/auth";
import Button from "./Button";
import styles from "./ProtectedPagesHeader.module.css";
import AdminHeader from "../features/admin/AdminHeader";
import WaiterHeader from "../features/waiter/WaiterHeader";
import KitchenHeader from "../features/kitchen/KitchenHeader";

function ProtectedPagesHeader() {
  const { mutate: logout, isLoading: isLoggingOut } = useHandleMutation(
    useLogoutMutation(),
    "Wylogowano pomyślnie",
    "/"
  );

  const { data, isLoading } = useIsLoggedInQuery();

  if (isLoading) return;
  const user = data.user;

  return (
    <div className={styles.protectedPageHeader}>
      <Link to="/">
        <img src="/logo.png" />
      </Link>
      <div className={styles.protectedPageHeaderButtons}>
        {user.role === "admin" && <AdminHeader />}
        {user.role === "waiter" && <WaiterHeader />}
        {user.role === "cook" && <KitchenHeader />}
        <Button onClick={logout} disabled={isLoggingOut}>
          {isLoggingOut ? "Wylogowywanie" : "Wyloguj"}
        </Button>
      </div>
    </div>
  );
}

export default ProtectedPagesHeader;
