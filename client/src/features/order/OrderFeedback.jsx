import { useSearchParams } from "react-router-dom";
import styles from "./OrderFeedback.module.css";
import Button from "../../ui/Button";
import { useDeleteUnpaidOrderMutation } from "../../services/orders";
import { useEffect } from "react";

function OrderFeedback({ status }) {
  const [searchParams] = useSearchParams();
  const [deleteOrder] = useDeleteUnpaidOrderMutation();

  const orderId = searchParams.get("orderId");

  useEffect(
    function () {
      if (status === "fail") deleteOrder(orderId);
    },
    [deleteOrder, orderId, status]
  );

  if (status === "success")
    return (
      <div className={styles.orderFeedback}>
        <h1>Dziękujemy za twoje zamówienie</h1>
        <div className={styles.orderFeedbackInfo}>
          <p>Zamówienie o numerze {orderId} zostało przekazane do realizacji</p>
          <p>Wysłaliśmy Ci krótkiego e-maila z potwierdzeniem.</p>
        </div>
        <Button to="/">Strona Główna</Button>
      </div>
    );

  if (status === "fail")
    return (
      <div className={styles.orderFeedback}>
        <h1>Przepraszamy, wystąpił błąd.</h1>
        <div className={styles.orderFeedbackInfo}>
          <p>
            Wystąpił błąd, spróbuj ponownie lub skontaktuj się z nami
            telefonicznie
          </p>
        </div>
        <Button to="/#contact">Kontakt</Button>
      </div>
    );
}

export default OrderFeedback;
