// eslint-disable-next-line
import styles from "./ButtonUnderline.module.css";

function ButtonUnderline({ color = "#219c90", onClick, children }) {
  return (
    <button
      style={{ color, borderColor: color }}
      className={styles.buttonUnderline}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ButtonUnderline;
