import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import styles from "./ContactMap.module.css";
import MapDisplayContainer from "../../ui/MapDisplayContainer";

function ContactMap() {
  return (
    <MapDisplayContainer coordinates={{ lat: 50.0268482, lng: 21.9856473 }} />
  );
}

export default ContactMap;
