import { useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";
import styles from "./ErrorPage.module.css";

function ErrorPage() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className={styles.errorPage}>
      <h1 className={styles.primaryHeader}>Coś poszło nie tak!</h1>
      <p>Przepraszamy, ale coś poszło bardzo nie tak!</p>
      <p>Informacje: {location?.state?.message || "Brak"}</p>
      <Button onClick={() => navigate("/")}>Główna</Button>
    </section>
  );
}

export default ErrorPage;
