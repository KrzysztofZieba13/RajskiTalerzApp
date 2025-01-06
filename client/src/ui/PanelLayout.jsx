import { useEffect } from "react";
import styles from "./PanelLayout.module.css";

function PanelLayout({ isOpen, handleHide, children }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "scroll";
  }, [isOpen]);

  return (
    <div
      className={styles.panel}
      style={isOpen ? { top: "0", visibility: "visible" } : {}}
    >
      <button className={styles.closePanelBtn} onClick={handleHide}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
      {children}
    </div>
  );
}

export default PanelLayout;
