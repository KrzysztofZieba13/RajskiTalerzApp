import styles from "./AdminEditMenu.module.css";
import AdminCreateProduct from "./AdminCreateProduct";
import AdminCard from "./AdminCard";
import ButtonUnderline from "../../ui/ButtonUnderline";
import { formatCurrency } from "../../utils/helpers";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../services/product";
import Spinner from "../../ui/Spinner";
import { useHandleMutation } from "../../hooks/useHandleMutation";

function AdminEditMenu() {
  const { data: productsRes, isLoading: isLoadingProducts } =
    useGetAllProductsQuery();

  const { mutate: deleteProduct, isLoading: isDeletingProduct } =
    useHandleMutation(useDeleteProductMutation(), "Usunięto produkt");

  if (isLoadingProducts) return <Spinner />;
  const products = productsRes.data;

  return (
    <div className={styles.adminEditMenu}>
      <AdminCreateProduct />
      <div>
        <h2>Usuń produkt z menu</h2>
        <div className={styles.productsToDelete}>
          {products.map((product) => (
            <AdminCard key={product._id}>
              <p className={styles.name}>{product.name}</p>
              <p className={styles.ingredients}>
                {product.ingredients.join(", ")}
              </p>
              <p className={styles.price}>{formatCurrency(product.price)}</p>
              <ButtonUnderline
                color="#ee4e4e"
                onClick={() => deleteProduct(product._id)}
              >
                {isDeletingProduct ? "Usuwanie..." : "Usuń"}
              </ButtonUnderline>
            </AdminCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminEditMenu;
