import styles from "./ContactInfo.module.css";

function ContactInfo() {
  return (
    <div className={styles.contactInfo}>
      <h2>RajskiTalerz</h2>
      <p>Rzeszów, Wincentego Pola 2</p>
      <p style={{ color: "#219c90", marginTop: "3.2rem" }}>Godziny otwarcia</p>
      <ul className={styles.openHours}>
        <li>
          <span>Pon</span>
          <span>07:00-00:00</span>
        </li>
        <li>
          <span>Wt</span>
          <span>07:00-00:00</span>
        </li>
        <li>
          <span>Śr</span>
          <span>07:00-00:00</span>
        </li>
        <li>
          <span>Czw</span>
          <span>07:00-00:00</span>
        </li>
        <li>
          <span>Pt</span>
          <span>07:00-00:00</span>
        </li>
        <li>
          <span>Sb</span>
          <span>07:00-00:00</span>
        </li>
        <li>
          <span>Ndz</span>
          <span>07:00-00:00</span>
        </li>
      </ul>

      <div className={styles.contactBtns}>
        <div>
          <a href="https://maps.app.goo.gl/DTvVNchYq3nrmL8Y9" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
                clipRule="evenodd"
              />
            </svg>
            Nawigacja
          </a>
        </div>
        <div>
          <a href="tel:+48123456789">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z"
                clipRule="evenodd"
              />
            </svg>
            +48 123 456 789
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;
