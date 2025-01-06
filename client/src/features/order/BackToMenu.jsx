import Button from "../../ui/Button";
import styles from "./BackToMenu.module.css";

function BackToMenu() {
  return (
    <div className={styles.backToMenu}>
      <p>Brak produktów w zamówieniu, wróć do menu</p>
      <Button to="/menu/favourites">Menu</Button>
    </div>
  );
}

export default BackToMenu;
