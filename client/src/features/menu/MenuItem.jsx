import Button from "../../ui/Button";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
import styles from "./MenuItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import AddToFavBtn from "./AddToFavBtn";
import { useIsLoggedInQuery } from "../../services/auth";
import Spinner from "../../ui/Spinner";

function MenuItem({ item }) {
  const { _id: id, name, image, ingredients, price } = item;
  const { data, isLoading: isLoadingUser } = useIsLoggedInQuery();
  const dispatch = useDispatch();
  const currentQuantity = useSelector(
    (state) => state.cart.cart.find((item) => item.itemId === id)?.quantity ?? 0
  );
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newItem = {
      itemId: id,
      name,
      quantity: 1,
      price,
    };

    dispatch(addItem(newItem));
  }

  if (isLoadingUser) return <Spinner />;

  return (
    <div className={styles.menuItem}>
      <img src={`http://localhost:3200/product-images/${image}`} />
      <div className={styles.itemDetails}>
        <div>
          <p className={styles.title}>
            {name}
            {data.user && <AddToFavBtn itemId={id} />}
          </p>
          <span className={styles.ingredients}>{ingredients}</span>
        </div>
        <div className={styles.itemActions}>
          {isInCart ? (
            <>
              <span className={styles.price}>{formatCurrency(price)}</span>
              <div className={styles.itemActionsBtns}>
                <UpdateItemQuantity
                  itemId={id}
                  currentQuantity={currentQuantity}
                />
                <Button
                  bgColor="#ee4e4e"
                  size="md"
                  onClick={() => dispatch(deleteItem(id))}
                >
                  Usuń
                </Button>
              </div>
            </>
          ) : (
            <>
              <span className={styles.price}>{formatCurrency(price)}</span>
              <Button bgColor="#ee4e4e" size="md" onClick={handleAddToCart}>
                Dodaj
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuItem;
