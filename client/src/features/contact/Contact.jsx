import styles from "./Contact.module.css";
import ContactInfo from "./ContactInfo";
import ContactMap from "./ContactMap";

function Contact() {
  return (
    <div className={styles.contact} id="contact">
      <ContactMap />
      <ContactInfo />
    </div>
  );
}

export default Contact;
