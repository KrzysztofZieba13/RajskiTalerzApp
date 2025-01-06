import styles from "./AccordionActionButton.module.css";

function AccordionActionButton({ onClick, disabled, children }) {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default AccordionActionButton;
