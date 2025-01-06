import styles from "./FooterContact.module.css";
import FooterContactSocials from "./FooterContactSocials";
import FooterContactWhatsApp from "./FooterContactWhatsApp";

function FooterContact() {
  return (
    <div className={styles.footerContact}>
      <h3>Znajdź nas</h3>
      <FooterContactSocials />
      <FooterContactWhatsApp />
    </div>
  );
}

export default FooterContact;
