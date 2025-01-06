import styles from "./CustomForm.module.css";

function CustomForm({ onSubmit, children }) {
  return (
    <form onSubmit={onSubmit} className={styles.customForm}>
      {children}
    </form>
  );
}

export default CustomForm;
