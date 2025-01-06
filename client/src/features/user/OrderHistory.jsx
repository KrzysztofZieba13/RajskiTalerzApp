import styles from "./OrderHistory.module.css";
import { useGetMyOrdersQuery } from "../../services/orders";
import Spinner from "../../ui/Spinner";
import OrderSummary from "./OrderSummary";
import { useSetTitle } from "../../hooks/useSetTitle";

function OrderHistory() {
  const { data, isLoading } = useGetMyOrdersQuery("Dostarczone&sort=-date");
  useSetTitle("Historia zamówień");

  return (
    <div className={styles.orderHistory}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {data.data.map((order) => (
            <OrderSummary key={order.id} order={order} />
          ))}
        </>
      )}
    </div>
  );
}

export default OrderHistory;
