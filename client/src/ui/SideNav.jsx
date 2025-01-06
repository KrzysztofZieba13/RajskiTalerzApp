import styles from "./SideNav.module.css";

function SideNav({ children }) {
  return <aside className={styles.sideNav}>{children}</aside>;
}

export default SideNav;
