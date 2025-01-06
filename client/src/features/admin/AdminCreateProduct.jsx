import { useReducer, useRef } from "react";
import styles from "./AdminCreateProduct.module.css";
import { useHandleMutation } from "../../hooks/useHandleMutation";
import { useCreateProductMutation } from "../../services/product";
import CustomForm from "../../ui/CustomForm";
import Input from "../auth/Input";
import Button from "../../ui/Button";

const initalErrorState = {
  nameError: "",
  priceError: "",
  ingredientsError: "",
  categoryError: "",
  imageError: "",
};

function productReducer(state, action) {
  switch (action.type) {
    case "setError": {
      return {
        ...state,
        [action.payload.field]: action.payload.message,
      };
    }
    case "resetErrors": {
      return initalErrorState;
    }
    default:
      return state;
  }
}

function AdminCreateProduct() {
  const nameRef = useRef("");
  const priceRef = useRef("");
  const ingredientsRef = useRef("");
  const categoryRef = useRef("");
  const imageRef = useRef(null);

  const { mutate: createProduct, isLoading } = useHandleMutation(
    useCreateProductMutation(),
    "Utworzono produkt"
  );
  const [state, dispatch] = useReducer(productReducer, initalErrorState);

  function clearRefs() {
    nameRef.current.value = "";
    priceRef.current.value = "";
    ingredientsRef.current.value = "";
    categoryRef.current.value = "";
    imageRef.current.value = "";
  }

  function handleCreateProduct(e) {
    e.preventDefault();

    const name = nameRef.current.value;
    const price = +priceRef.current.value;
    const ingredients = ingredientsRef.current.value;
    const category = categoryRef.current.value;
    const image = imageRef.current.files[0];
    let isError = false;

    dispatch({ type: "resetErrors" });

    if (!name) {
      dispatch({
        type: "setError",
        payload: { field: "nameError", message: "Wypełnij pole Nazwa" },
      });
      isError = true;
    }
    if (!price) {
      dispatch({
        type: "setError",
        payload: { field: "priceError", message: "Wypełnij pole Cena" },
      });
      isError = true;
    }
    if (!ingredients) {
      dispatch({
        type: "setError",
        payload: {
          field: "ingredientsError",
          message: "Wypełnij pole Składniki",
        },
      });
      isError = true;
    }
    if (!category) {
      dispatch({
        type: "setError",
        payload: { field: "categoryError", message: "Wypełnij pole Kategoria" },
      });
      isError = true;
    }
    if (!image) {
      dispatch({
        type: "setError",
        payload: { field: "imageError", message: "Wypełnij pole Zdjęcie" },
      });
      isError = true;
    }
    if (isError) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("ingredients", ingredients);
    formData.append("category", category);
    formData.append("image", image);

    createProduct(formData);

    clearRefs();
  }

  return (
    <div className={styles.adminCreateProduct}>
      <h2>Dodaj produkt do menu</h2>
      <CustomForm onSubmit={handleCreateProduct}>
        <Input
          ref={nameRef}
          inputData={{ id: "name", title: "Nazwa", type: "text" }}
          error={state.nameError}
        />
        <Input
          ref={priceRef}
          inputData={{ id: "price", title: "Cena", type: "number" }}
          error={state.priceError}
        />
        <Input
          ref={ingredientsRef}
          inputData={{ id: "ingredients", title: "Składniki", type: "text" }}
          error={state.ingredientsError}
        />
        <div className={styles.select}>
          <label htmlFor="role">Kategoria</label>
          <select id="role" ref={categoryRef} defaultValue="Makarony">
            <option value="pasta">Makarony</option>
            <option value="pizza">Pizza</option>
            <option value="croissaint">Croissaint</option>
            <option value="salad">Sałatki</option>
            <option value="burrito">Burrito</option>
            <option value="dinner">Obiady</option>
            <option value="breakfast">Śniadania</option>
            <option value="drink">Napoje</option>
          </select>
        </div>
        <Input
          ref={imageRef}
          inputData={{ id: "image", title: "Zdjęcie", type: "file" }}
          error={state.imageError}
        />
        <Button size="md" disabled={isLoading}>
          {isLoading ? "Tworzenie..." : "Dodaj"}
        </Button>
      </CustomForm>
    </div>
  );
}

export default AdminCreateProduct;
