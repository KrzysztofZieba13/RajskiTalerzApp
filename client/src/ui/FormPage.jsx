import styles from "./FormPage.module.css";

function FormPage({ img, subtitle, title, children }) {
  return (
    <section className={styles.formPage}>
      <div className={styles.sideImage}>{img}</div>
      <div className={styles.formBox}>
        <span className={styles.formSubtitle}>{subtitle}</span>
        <h2 className={styles.title}>{title}</h2>
        {children}
      </div>
    </section>
  );
}

export default FormPage;
