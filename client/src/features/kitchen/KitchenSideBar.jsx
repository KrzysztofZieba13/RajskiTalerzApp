import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./KitchenSideBar.module.css";
import { useGetAllPendingOrdersQuery } from "../../services/orders";
import { useMemo } from "react";
import Spinner from "../../ui/Spinner";

function KitchenSideBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: responseOrders, isLoading } = useGetAllPendingOrdersQuery(
    "W realizacji,Gotowe"
  );

  const responseOrdersMap = useMemo(() => {
    const map = new Map();
    responseOrders?.data.forEach((item) => {
      if (item.status !== "W realizacji") return;
      item.products.forEach((product) => {
        const { name } = product.product;
        map.set(name, (map.get(name) || 0) + product.quantity);
      });
    });
    return map;
  }, [responseOrders]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <aside className={styles.kitchenSidebar}>
          <div
            className={`${styles.allOrderedItems} ${
              !searchParams.size ? styles.selected : ""
            }`}
            onClick={() => setSearchParams("")}
          >
            Wszystko
          </div>
          <div
            className={`${styles.allOrderedItems} ${
              searchParams.get("status") === "W realizacji"
                ? styles.selected
                : ""
            }`}
            onClick={() => setSearchParams({ status: "W realizacji" })}
          >
            W Realizacji
          </div>
          <div
            className={`${styles.allOrderedItems} ${
              searchParams.get("status") === "Gotowe" ? styles.selected : ""
            }`}
            onClick={() => setSearchParams({ status: "Gotowe" })}
          >
            Gotowe
          </div>
          {Array.from(responseOrdersMap.entries()).map(([name, quantity]) => (
            <div
              className={`${styles.orderedItem} ${
                searchParams.get("productName") === name ? styles.selected : ""
              }`}
              onClick={() => {
                setSearchParams({ productName: name });
              }}
              key={name}
            >
              <span>{`${quantity} ${name}`}</span>
            </div>
          ))}
        </aside>
      )}
    </>
  );
}

export default KitchenSideBar;
