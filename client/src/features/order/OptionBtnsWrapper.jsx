import styles from "./OptionBtnsWrapper.module.css";

function OptionBtnsWrapper({ children }) {
  return <div className={styles.optionBtnsWrapper}>{children}</div>;
}

export default OptionBtnsWrapper;
