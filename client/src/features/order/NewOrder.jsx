import OrderProgressBar from "./OrderProgressBar";
import styles from "./NewOrder.module.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { resetNewOrderData } from "./orderSlice";
import { selectCartLength } from "../cart/cartSlice";
import BackToMenu from "./BackToMenu";
import { useSetTitle } from "../../hooks/useSetTitle";

function NewOrder() {
  useSetTitle("Składanie zamówienia");
  const deliveryMethod = useSelector((state) => state.order.deliveryMethod);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const itemsInCart = useSelector(selectCartLength);

  useEffect(
    function () {
      if (!deliveryMethod) {
        navigate("/new-order/choose-delivery");
        dispatch(resetNewOrderData());
      }
    },
    [deliveryMethod, navigate, dispatch]
  );

  useEffect(
    function () {
      if (location.pathname === "/new-order/choose-delivery")
        dispatch(resetNewOrderData());
    },
    [dispatch, location.pathname]
  );

  return (
    <section className={styles.newOrder}>
      {itemsInCart ? (
        <>
          <OrderProgressBar />
          <Outlet />
        </>
      ) : (
        <BackToMenu />
      )}
    </section>
  );
}

export default NewOrder;
