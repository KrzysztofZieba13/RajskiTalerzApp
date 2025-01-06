import { useState } from "react";
import ButtonUnderline from "../../ui/ButtonUnderline";
import styles from "./NotificationShowMoreDisplay.module.css";

function NotificationShowMoreDisplay({ message }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      {showMore ? (
        <p className={styles.showMore}>
          {message}
          <ButtonUnderline onClick={() => setShowMore(false)}>
            Mniej
          </ButtonUnderline>
        </p>
      ) : (
        <p className={styles.showMore}>
          <ButtonUnderline onClick={() => setShowMore(true)}>
            Więcej
          </ButtonUnderline>
        </p>
      )}
    </>
  );
}

export default NotificationShowMoreDisplay;
