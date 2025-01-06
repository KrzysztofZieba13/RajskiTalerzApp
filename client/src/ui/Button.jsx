import { Link } from "react-router-dom";
import styles from "./Button.module.css";
import { memo } from "react";

const Button = memo(function Button({
  to,
  size,
  shape = "rect",
  onClick,
  bgColor = "#ee4e4e",
  color,
  className,
  disabled,
  children,
}) {
  const btnStyles = {};
  if (bgColor) btnStyles.backgroundColor = bgColor;
  if (color) btnStyles.color = color;

  if (to)
    return (
      <Link
        to={to}
        style={btnStyles}
        className={`${styles.button} ${styles[className]} ${
          shape === "circle" ? styles.buttonCircle : ""
        } ${size === "md" ? styles.buttonMedium : ""}`}
        onClick={onClick}
        disabled={true}
      >
        {children}
      </Link>
    );

  return (
    <button
      style={btnStyles}
      className={`${styles.button} ${styles[className]} ${
        shape === "circle" ? styles.buttonCircle : ""
      } ${size === "md" ? styles.buttonMedium : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
});

export default Button;
