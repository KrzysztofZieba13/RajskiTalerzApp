import { useState } from "react";
import { useIsLoggedInQuery } from "../../services/auth";
import {
  useAddProductToFavouritesMutation,
  useDeleteProductFromFavouritesMutation,
} from "../../services/users";
import { useDispatch } from "react-redux";
import { showAlert } from "../alert/alertSlice";

function AddToFavBtn({ itemId }) {
  const dispatch = useDispatch();
  const [localIsFav, setLocalIsFav] = useState(null);
  const [addToFavs, { isLoading: isAdding }] =
    useAddProductToFavouritesMutation();
  const [deleteFromFavs, { isLoading: isDeleting }] =
    useDeleteProductFromFavouritesMutation();
  const { data: currentUser } = useIsLoggedInQuery();

  const isFavFromQuery = currentUser?.user?.favouriteProducts.some(
    (item) => item._id === itemId
  );

  const isFav = localIsFav !== null ? localIsFav : isFavFromQuery;
  const isLoading = isAdding || isDeleting;

  const handleAddToFavs = async () => {
    setLocalIsFav(true);
    try {
      await addToFavs(itemId).unwrap();
    } catch {
      setLocalIsFav(isFavFromQuery);
      dispatch(
        showAlert({
          message: "Błąd podczas dodawania do ulubionych",
          status: "error",
        })
      );
    }
  };

  const handleRemoveFromFavs = async () => {
    setLocalIsFav(false);
    try {
      await deleteFromFavs(itemId).unwrap();
    } catch {
      setLocalIsFav(isFavFromQuery);
      dispatch(
        showAlert({
          message: "Błąd podczas usuwania z ulubionych",
          status: "error",
        })
      );
    }
  };

  if (isLoading) {
    return (
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="#219c90"
          className="size-5"
        >
          <path
            fillRule="evenodd"
            d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  }

  if (!isFav) {
    return (
      <span onClick={handleAddToFavs}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#219c90"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </span>
    );
  }

  if (isFav) {
    return (
      <span onClick={handleRemoveFromFavs}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#219c90"
          className="size-6"
        >
          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
        </svg>
      </span>
    );
  }
}
export default AddToFavBtn;
