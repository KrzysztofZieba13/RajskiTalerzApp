import { Link, useMatch } from "react-router-dom";
import styles from "./Header.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import MobileNav from "./MobileNav";
import Cart from "../features/cart/Cart";
import Notification from "../features/notification/Notification";
import { useIsLoggedInQuery } from "../services/auth";
import HeaderNavList from "./HeaderNavList";

function Header() {
  const { data, isLoading, isError } = useIsLoggedInQuery();
  const [isMobileNav, setIsMobileNav] = useState(false);
  const [isCart, setIsCart] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const isHomeSectionVisible = useSelector((state) => state.home.isVisible);
  const isHome = useMatch("/");
  const [isHoverEl, setIsHoverEl] = useState(null);

  let isUser;
  if (isLoading || isError || !data.user) isUser = false;
  if (data?.user) isUser = data.user;

  function isActive(elNum) {
    if (!isHoverEl) return;
    if (elNum !== isHoverEl) return { opacity: "0.4" };
  }

  return (
    <header
      className={styles.header}
      style={
        isHomeSectionVisible && isHome
          ? { backgroundColor: "transparent" }
          : { backgroundColor: "#fffddd", boxShadow: "0px 3px 3px #77777752" }
      }
    >
      <Link to="/">
        <img
          src="/logo.png"
          className={styles.logo}
          style={isActive(5)}
          onMouseEnter={() => setIsHoverEl(5)}
          onMouseLeave={() => setIsHoverEl(null)}
        />
      </Link>
      <nav className={styles.nav}>
        <HeaderNavList
          isUser={isUser}
          isActive={isActive}
          user={data?.user || null}
          handleHover={setIsHoverEl}
          handleCart={setIsCart}
          handleNotification={setIsNotification}
          handleMobileNav={setIsMobileNav}
        />
      </nav>
      <MobileNav
        isOpen={isMobileNav}
        handleHide={() => setIsMobileNav(false)}
      />
      <Cart isOpen={isCart} handleHide={() => setIsCart(false)} />
      {isUser && (
        <Notification
          isOpen={isNotification}
          handleHide={() => setIsNotification(false)}
        />
      )}
    </header>
  );
}

export default Header;
