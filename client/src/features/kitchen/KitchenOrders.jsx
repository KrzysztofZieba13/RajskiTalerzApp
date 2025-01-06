import { useSearchParams } from "react-router-dom";
import { useGetAllPendingOrdersQuery } from "../../services/orders";
import Spinner from "../../ui/Spinner";
import styles from "./KitchenOrders.module.css";
import OrderCart from "./OrderCart";
import KitchenOrdersByProduct from "./KitchenOrdersByProduct";

function KitchenOrders() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    data: responseOrders,
    isLoading,
    isFetching,
  } = useGetAllPendingOrdersQuery("W realizacji,Gotowe", {
    skip: searchParams.get("productName"),
  });

  const orders = responseOrders?.data;
  if (isLoading) return <Spinner />;

  const onlySelectedProducts = searchParams.get("productName");
  const onlyReadyOrders = searchParams.get("status") === "Gotowe";
  const onlyPendingOrders = searchParams.get("status") === "W realizacji";

  if (onlySelectedProducts)
    return (
      <div className={styles.kitchenOrders}>
        <KitchenOrdersByProduct productName={searchParams.get("productName")} />
      </div>
    );

  if (onlyReadyOrders)
    return (
      <div className={styles.kitchenReadyOrders}>
        {orders.map((order) => {
          if (order.status === "Gotowe")
            return (
              <OrderCart
                order={order}
                key={order._id}
                isUpdating={isFetching}
              />
            );
        })}
      </div>
    );

  if (onlyPendingOrders)
    return (
      <div className={styles.kitchenOrders}>
        {orders.map((order) => {
          if (order.status === "W realizacji")
            return (
              <OrderCart
                order={order}
                key={order._id}
                isUpdating={isFetching}
              />
            );
        })}
      </div>
    );

  return (
    <>
      <div className={styles.kitchenOrders}>
        {orders.map((order) => {
          if (order.status === "W realizacji")
            return (
              <OrderCart
                order={order}
                key={order._id}
                isUpdating={isFetching}
              />
            );
        })}
      </div>

      <div className={styles.kitchenReadyOrders}>
        {orders.map((order) => {
          if (order.status === "Gotowe")
            return (
              <OrderCart
                order={order}
                key={order._id}
                isUpdating={isFetching}
              />
            );
        })}
      </div>
    </>
  );
}

export default KitchenOrders;
