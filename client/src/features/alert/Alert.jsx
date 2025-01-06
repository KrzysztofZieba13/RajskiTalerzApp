import { useEffect } from "react";
import styles from "./Alert.module.css";
import { useDispatch, useSelector } from "react-redux";
import { hideAlert } from "./alertSlice";

function Alert() {
  const { seconds, message, status } = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const timeout = seconds * 1000;

  useEffect(
    function () {
      const timer = setTimeout(() => dispatch(hideAlert()), timeout);

      return function cleanup() {
        clearTimeout(timer);
      };
    },
    [timeout, dispatch]
  );

  return (
    <div
      className={`${styles.alert} ${
        status === "success" ? styles.success : styles.error
      }`}
    >
      {message}
    </div>
  );
}

export default Alert;
