import { useGetAllOrdersByProductQuery } from "../../services/orders";
import OrderCart from "./OrderCart";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";

function KitchenOrdersByProduct({ productName }) {
  const navigate = useNavigate();
  const {
    data: ordersResponse,
    isLoading,
    isFetching,
  } = useGetAllOrdersByProductQuery(productName);

  if (isLoading) return <Spinner />;

  const orders = ordersResponse.data;

  if (!orders.length) navigate("");

  return orders.map((order) => (
    <OrderCart order={order} key={order._id} isUpdating={isFetching} />
  ));
}

export default KitchenOrdersByProduct;
