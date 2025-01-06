import MapDisplayContainer from "../../ui/MapDisplayContainer";
import NoData from "../../ui/NoData";
import Spinner from "../../ui/Spinner";
import styles from "./DeliveryRoute.module.css";

function DeliveryRoute({ coords, link }) {
  if (!coords) return <NoData message="Nie wybrano zamówienia" />;
  const { lat, lng } = coords;

  return (
    <div className={styles.deliveryRoute}>
      <MapDisplayContainer coordinates={{ lat, lng }} />
      <a href={link} target="_blank" className={styles.linkToGoogleMaps}>
        Wyznacz trasę
      </a>
    </div>
  );
}

export default DeliveryRoute;
