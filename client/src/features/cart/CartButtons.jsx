import Button from "../../ui/Button";
import styles from "./CartButtons.module.css";

function CartButtons({ onClick }) {
  return (
    <div className={styles.cartButtons}>
      <Button className="clearCart">Wyczyść</Button>
      <Button to="/new-order/choose-delivery" onClick={onClick}>
        Zamów
      </Button>
    </div>
  );
}

export default CartButtons;
