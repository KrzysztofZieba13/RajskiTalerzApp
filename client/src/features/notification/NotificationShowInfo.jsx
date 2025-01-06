import { formatDate, formatCurrency } from "../../utils/helpers";
import NotificationShowMoreDisplay from "./NotificationShowMoreDisplay";

function NotificationShowInfo({ notification }) {
  const { status } = notification;

  if (status === "W realizacji")
    return (
      <NotificationShowMoreDisplay
        message={`Zamówienie w formie ${notification.deliveryMethod.toUpperCase()} o wartości ${formatCurrency(
          notification.totalPrice
        )} w trakcie realizacji.`}
      />
    );
  if (status === "Gotowe")
    return (
      <NotificationShowMoreDisplay
        message={`Zamówienie gotowe. Wkrótce je otrzymasz.`}
      />
    );
  if (status === "Dostarczone")
    return (
      <NotificationShowMoreDisplay
        message={`Twoje zamówienie z dnia ${formatDate(
          notification.date
        )} zostało dostarczone.`}
      />
    );
  if (status === "W drodze")
    return (
      <NotificationShowMoreDisplay
        message={`Twoje zamówienie jest w drodze.`}
      />
    );
  if (status === "Oczekiwanie")
    return (
      <NotificationShowMoreDisplay
        message={`Twoja rezerwacja na dzień ${formatDate(
          notification.bookingDate
        )} stolika dla ${
          notification.guestsNumber
        } osób, została przekazana do rozpatrzenia`}
      />
    );
  if (status === "Zatwierdzono")
    return (
      <NotificationShowMoreDisplay
        message={`Twoja rezerwacja na dzień ${formatDate(
          notification.bookingDate
        )} stolika dla ${
          notification.guestsNumber
        } osób, została pozytywnie rozpatrzona`}
      />
    );
  if (status === "Odrzucono")
    return (
      <NotificationShowMoreDisplay
        message={`Twoja rezerwacja na dzień ${formatDate(
          notification.bookingDate
        )} stolika dla ${
          notification.guestsNumber
        } osób, została odrzucona. Brak miejsc!`}
      />
    );

  return;
}

export default NotificationShowInfo;
