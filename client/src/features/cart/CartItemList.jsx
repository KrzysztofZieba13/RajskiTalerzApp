import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import styles from "./CartItemList.module.css";
import { formatCurrency } from "../../utils/helpers";

function CartItemList() {
  const cart = useSelector((state) => state.cart.cart);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <ul className={styles.cartItems}>
        {cart.map((item) => (
          <CartItem item={item} key={item.itemId} />
        ))}
      </ul>
      <p className={styles.totalPrice}>Total: {formatCurrency(totalPrice)}</p>
    </>
  );
}

export default CartItemList;
