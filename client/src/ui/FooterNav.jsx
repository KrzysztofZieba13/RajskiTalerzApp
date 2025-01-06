import { Link } from "react-router-dom";
import styles from "./FooterNav.module.css";

function FooterNav() {
  return (
    <ul className={styles.footerNav}>
      <li>
        <Link to="/">Rajski Talerz</Link>
      </li>
      <li>
        <Link to="/">Menu</Link>
      </li>
      <li>
        <Link to="/">Kontakt</Link>
      </li>
      <li>
        <Link to="/">Lokalizacja</Link>
      </li>
      <li>
        <Link to="/">Logowanie</Link>
      </li>
    </ul>
  );
}

export default FooterNav;
