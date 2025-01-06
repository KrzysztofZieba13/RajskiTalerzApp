import { useParams } from "react-router-dom";
import MenuItem from "./MenuItem";
import styles from "./MenuItems.module.css";
import { useGetProductsByCategoryQuery } from "../../services/product";
import Spinner from "../../ui/Spinner";
import { useIsLoggedInQuery } from "../../services/auth";

function MenuItems() {
  const { category } = useParams();
  const { data, isSuccess, isLoading, status } = useGetProductsByCategoryQuery(
    category,
    { skip: category === "favourites" }
  );
  const {
    data: currentUser,
    isLoading: favIsLoading,
    status: favStatus,
    isSuccess: favIsSuccess,
  } = useIsLoggedInQuery(undefined, {
    skip: category !== "favourites",
  });

  const itemsAreLoading =
    isLoading ||
    status === "pending" ||
    favIsLoading ||
    favStatus === "pending";

  const items = [];
  if (isSuccess) items.push(...data.data);
  if (currentUser?.user) items.push(...currentUser.user.favouriteProducts);

  const noFavourites =
    category === "favourites" && items.length === 0 && favIsSuccess;

  if (noFavourites)
    return <p className={styles.message}>Brak wyników do wyświetlenia</p>;

  return (
    <div className={styles.menuItems}>
      {itemsAreLoading ? (
        <Spinner />
      ) : (
        <>
          {items.map((item) => (
            <MenuItem item={item} key={item._id} />
          ))}
        </>
      )}
    </div>
  );
}

export default MenuItems;
