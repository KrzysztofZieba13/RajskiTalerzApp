import styles from "./LoyaltyPoints.module.css";

function LoyaltyPoints() {
  return (
    <div className={styles.loyaltyPoints}>
      Punkty lojalnościowe: 530pkt
      <div className={styles.selectDiscount}>
        <button>Rabat -10% (-100pkt)</button>
        <button>Rabat -25% (-250pkt)</button>
        <button>Rabat -50% (-500pkt)</button>
      </div>
    </div>
  );
}

export default LoyaltyPoints;
