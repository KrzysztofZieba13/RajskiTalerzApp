import dayjs from "dayjs";
import styles from "./KitchenOrdersArchive.module.css";
import { useLazyGetAllOrdersQuery } from "../../services/orders";
import { useSearchParams } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "../../ui/ExpandMoreIcon";
import Spinner from "../../ui/Spinner";
import { formatCurrency, formatDate } from "../../utils/helpers";
import SelectAndSearch from "../../ui/SelectAndSearch";
import { useSetTitle } from "../../hooks/useSetTitle";

function KitchenOrdersArchive() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [getOrders, { data: orders, isLoading }] = useLazyGetAllOrdersQuery();
  useSetTitle("Archiwum");

  function handleSubmit(e) {
    e.preventDefault();
    getOrders(
      `?date[gte]=${searchParams.get("date")}&date[lte]=${dayjs(
        searchParams.get("date")
      )
        .add(1, "day")
        .format("YYYY-MM-DD")}&status=Dostarczone`
    );
  }

  return (
    <div className={styles.kitchenOrdersArchive}>
      <SelectAndSearch onSubmit={handleSubmit} disableForFuture={true} />
      <div className={styles.accordions}>
        {isLoading && <Spinner />}
        {orders?.data &&
          orders.data.map((order) => (
            <Accordion key={order._id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <div className={styles.accordionSummary}>
                  <p>{formatDate(order.date)}</p>
                  <p>{formatCurrency(order.totalPrice)}</p>
                </div>
              </AccordionSummary>
              <AccordionDetails sx={{ fontSize: "1.6rem" }}>
                <div className={styles.orderDetails}>
                  <div>
                    <p>
                      Imię:
                      {order.clientData.name === "Waiter"
                        ? "Złożone przez kelnera"
                        : order.clientData.name}
                    </p>
                    <p>Telefon: {order.clientData.telephone}</p>
                    <p>Email: {order.clientData.email}</p>
                    {order.orderComment && (
                      <p>Komentarz Zamówienia: {order.orderComment}</p>
                    )}
                  </div>
                  <div>
                    <p>Priorytet: {order.orderPriority.toUpperCase()}</p>
                    {order.orderOnDate && (
                      <p>Termin: {formatDate(order.orderOnDate)}</p>
                    )}
                    <p>Sp. dost: {order.deliveryMethod}</p>
                    {order.tableNumber && (
                      <p>Nr. stolika: {order.tableNumber}</p>
                    )}
                    <p>Płatność: {order.paymentMethod}</p>
                    <p>Status: {order.status}</p>
                  </div>
                  {order?.deliveryData && (
                    <div>
                      {order.deliveryData.deliveryComment && (
                        <p>
                          Komentarz Dostawy:{" "}
                          {order.deliveryData.deliveryComment}
                        </p>
                      )}
                      <p>Miasto: {order.deliveryData.city}</p>
                      <p>Ulica: {order.deliveryData.street}</p>
                      <p>Nr. Budynku: {order.deliveryData.buildingNumber}</p>
                      <p>Piętro: {order.deliveryData.floor}</p>
                      <p>Nr. Lokalu: {order.deliveryData.localNumber}</p>
                    </div>
                  )}
                </div>
                <div className={styles.productList}>
                  <p className={styles.productListTitle}>Produkty</p>
                  <p>
                    {order.products.map(
                      (item, i) =>
                        `${i === 0 ? "" : ", "}${item.quantity} ${
                          item.product.name
                        }`
                    )}
                  </p>
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
      </div>
    </div>
  );
}

export default KitchenOrdersArchive;
