import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import FooterNav from "./FooterNav";
import FooterContact from "./FooterContact";

function Footer() {
  return (
    <footer className={styles.footer}>
      <Link to="/">
        <img src="/logo.png" alt="Rajski talerz logo" />
      </Link>
      <FooterNav />
      <FooterContact />
    </footer>
  );
}

export default Footer;
