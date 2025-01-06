import styles from "./MapDisplayContainer.module.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

function MapDisplayContainer({ coordinates }) {
  return (
    <div className={styles.mapDisplayContainer}>
      <MapContainer
        className={styles.map}
        center={[coordinates.lat, coordinates.lng]}
        zoom={15}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={[coordinates.lat, coordinates.lng]} />
      </MapContainer>
    </div>
  );
}

export default MapDisplayContainer;
