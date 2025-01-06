import styles from "./UpdateItemQuantity.module.css";
import Button from "../../ui/Button";
import { increaseItemQuantity, decreaseItemQuantity } from "./cartSlice";
import { useDispatch } from "react-redux";

function UpdateItemQuantity({ itemId, currentQuantity }) {
  const dispatch = useDispatch();

  return (
    <div className={styles.updateItemQuantity}>
      <Button
        shape="circle"
        bgColor="#219c90"
        onClick={() => dispatch(decreaseItemQuantity(itemId))}
      >
        -
      </Button>
      <span>{currentQuantity}</span>
      <Button
        shape="circle"
        bgColor="#219c90"
        onClick={() => dispatch(increaseItemQuantity(itemId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
