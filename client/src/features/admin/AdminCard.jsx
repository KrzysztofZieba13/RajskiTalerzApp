import styles from "./AdminCard.module.css";

function AdminCard({ children }) {
  return <div className={styles.adminCard}>{children}</div>;
}

export default AdminCard;
