import { memo } from "react";
import PanelLayout from "../../ui/PanelLayout";
import styles from "./Cart.module.css";
import CartItemList from "./CartItemList";
import CartButtons from "./CartButtons";
import { selectCartLength } from "../cart/cartSlice";
import { useSelector } from "react-redux";
import NoData from "../../ui/NoData";

const Cart = memo(function Cart({ isOpen, handleHide }) {
  const cartLength = useSelector(selectCartLength);

  return (
    <PanelLayout isOpen={isOpen} handleHide={handleHide}>
      <div className={styles.cart}>
        {cartLength ? (
          <>
            <CartItemList />
            <CartButtons onClick={handleHide} />
          </>
        ) : (
          <NoData message="Koszyk jest pusty" />
          // <>
          //   <p className={styles.emptyCartTitle}>Koszyk jest pusty</p>
          //   <div className={styles.emptyCart}>
          //     <svg
          //       xmlns="http://www.w3.org/2000/svg"
          //       viewBox="0 0 20 20"
          //       fill="currentColor"
          //       className="size-5"
          //     >
          //       <path
          //         fillRule="evenodd"
          //         d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-3.536-3.475a.75.75 0 0 0 1.061 0 3.5 3.5 0 0 1 4.95 0 .75.75 0 1 0 1.06-1.06 5 5 0 0 0-7.07 0 .75.75 0 0 0 0 1.06ZM9 8.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S7.448 7 8 7s1 .672 1 1.5Zm3 1.5c.552 0 1-.672 1-1.5S12.552 7 12 7s-1 .672-1 1.5.448 1.5 1 1.5Z"
          //         clipRule="evenodd"
          //       />
          //     </svg>
          //   </div>
          // </>
        )}
      </div>
    </PanelLayout>
  );
});

export default Cart;
