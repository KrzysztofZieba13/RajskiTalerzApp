import styles from "./OptionBtn.module.css";

function OptionBtn({ isActive, onClick, children }) {
  return (
    <button
      className={`${styles.orderChooseOption} ${
        isActive ? styles.orderChooseOptionActive : {}
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default OptionBtn;
