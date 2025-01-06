import { Link } from "react-router-dom";
import styles from "./MobileNav.module.css";
import PanelLayout from "./PanelLayout";
import { memo } from "react";
import { useIsLoggedInQuery, useLogoutMutation } from "../services/auth";
import { useHandleMutation } from "../hooks/useHandleMutation";
import { useDispatch } from "react-redux";
import { api } from "../services/api";
import { resetNewOrderData } from "../features/order/orderSlice";
import { clearCart } from "../features/cart/cartSlice";

const MobileNav = memo(function MobileNav({ isOpen, handleHide }) {
  const { data } = useIsLoggedInQuery();
  const dispatch = useDispatch();
  const { mutate: logout } = useHandleMutation(
    useLogoutMutation(),
    "Wylogowano pomyślnie",
    "/"
  );

  function handleLogout() {
    logout();
    handleHide();
    setTimeout(() => {
      dispatch(api.util.resetApiState());
    }, 500);
    dispatch(resetNewOrderData());
    dispatch(clearCart());
  }

  return (
    <PanelLayout isOpen={isOpen} handleHide={handleHide}>
      {data?.user ? (
        <ul className={styles.navList}>
          <li>
            <Link to="/" onClick={handleHide}>
              Rajski Talerz
            </Link>
          </li>
          <li>
            <Link to="/menu/favourites" onClick={handleHide}>
              Menu
            </Link>
          </li>
          <li>
            <Link to="/#contact" onClick={handleHide}>
              Kontakt
            </Link>
          </li>
          <li>
            <Link to="/booking" onClick={handleHide}>
              Rezerwacja
            </Link>
          </li>
          <li>
            <Link to="/user" onClick={handleHide}>
              Profil
            </Link>
          </li>
          <li>
            <Link onClick={handleLogout}>Wyloguj</Link>
          </li>
        </ul>
      ) : (
        <ul className={styles.navList}>
          <li>
            <Link to="/" onClick={handleHide}>
              Rajski Talerz
            </Link>
          </li>
          <li>
            <Link to="/menu/pasta" onClick={handleHide}>
              Menu
            </Link>
          </li>
          <li>
            <Link to="/#contact" onClick={handleHide}>
              Kontakt
            </Link>
          </li>
          <li>
            <Link to="auth/login" onClick={handleHide}>
              Zaloguj
            </Link>
          </li>
        </ul>
      )}
    </PanelLayout>
  );
});

export default MobileNav;
