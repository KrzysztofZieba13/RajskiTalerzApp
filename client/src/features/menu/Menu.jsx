import useScrollToSection from "../../hooks/useScrollToSection";
import styles from "./Menu.module.css";
import MenuItems from "./MenuItems";
import MenuNav from "./MenuNav";
import { useSetTitle } from "../../hooks/useSetTitle";

function Menu() {
  useScrollToSection();
  useSetTitle("Menu");

  return (
    <section className={styles.menu}>
      <MenuNav />
      <MenuItems />
    </section>
  );
}

export default Menu;
