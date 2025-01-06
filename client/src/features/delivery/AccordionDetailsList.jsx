import { formatCurrency, formatDate } from "../../utils/helpers";
import styles from "./AccordionDetailsList.module.css";

function AccordionDetailsList({ order }) {
  return (
    <div className={styles.accordionDetailsList}>
      <div>
        <p>Miasto: {order.deliveryData.city}</p>
        <p>Ulica: {order.deliveryData.street}</p>
        <p>Nr. Budynku: {order.deliveryData.buildingNumber}</p>
        <p>Nr. Lokalu: {order.deliveryData.localNumber}</p>
        <p>Telefon: {order.clientData.telephone}</p>
      </div>
      <div>
        <p>Piętro: {order.deliveryData.floor}</p>
        <p>Met. płatności: {order.paymentMethod}</p>
        <p>
          Do zapłaty:{" "}
          {order.paymentMethod !== "online"
            ? formatCurrency(order.totalPrice)
            : "OPŁACONO"}
        </p>
        {order.orderOnDate ? (
          <p>Termin: {formatDate(order.orderOnDate)}</p>
        ) : (
          ""
        )}
        <p>Komentarz: {order.deliveryData.deliveryComment}</p>
      </div>
    </div>
  );
}

export default AccordionDetailsList;
