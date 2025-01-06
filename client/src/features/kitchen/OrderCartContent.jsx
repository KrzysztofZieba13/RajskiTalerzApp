import { useEffect, useState } from "react";
import styles from "./OrderCartContent.module.css";
import OrderCartItem from "./OrderCartItem";
import Spinner from "../../ui/Spinner";
import {
  useUpdateOrderMutation,
  useUpdateProductInOrderMutation,
} from "../../services/orders";

function OrderCartContent({ isUpdating, order }) {
  const [updateOrder, { isLoading: isUpdatingWholeOrder }] =
    useUpdateOrderMutation();
  const [updateProductInOrder, { isLoading }] =
    useUpdateProductInOrderMutation();
  const [isUpdatingUI, setIsUpdatingUI] = useState(false);
  const isFetchingOrLoading =
    (isUpdatingUI && isUpdating) || isLoading || isUpdatingWholeOrder;
  const orderProductsLength = order.products.length;

  function handleUpdate(productId, newStatus) {
    updateProductInOrder({
      orderId: order._id,
      productId,
      newStatus,
    });
    setIsUpdatingUI(true);
  }

  useEffect(
    function () {
      if (!isUpdating) setIsUpdatingUI(false);
    },
    [isUpdating]
  );

  useEffect(
    function () {
      if (
        order.products.every((product) => product.isReady === true) &&
        order.status !== "Gotowe"
      ) {
        updateOrder({ orderId: order._id, status: "Gotowe" });
        setIsUpdatingUI(true);
      }
    },
    [order._id, order.products, updateOrder, order.status]
  );

  useEffect(
    function () {
      if (
        order.products.some((product) => product.isReady === false) &&
        order.status === "Gotowe"
      ) {
        updateOrder({ orderId: order._id, status: "W realizacji" });
        setIsUpdatingUI(true);
      }
    },
    [order._id, order.products, order.status, updateOrder]
  );

  if (isFetchingOrLoading) return <Spinner />;

  return (
    <div
      className={`${styles.orderCartContent} ${
        orderProductsLength > 2 ? styles.orderCartContentOverflow : ""
      }`}
    >
      {order.products.map((item) => (
        <OrderCartItem
          item={item}
          key={item.id}
          orderId={order._id}
          isUpdating={isUpdating}
          onUpdate={handleUpdate}
        />
      ))}
      {order.orderComment && (
        <p
          className={styles.orderComment}
          style={{ marginTop: "auto", fontSize: "1.2rem" }}
        >
          Komentarz: {order.orderComment}
        </p>
      )}
    </div>
  );
}

export default OrderCartContent;
