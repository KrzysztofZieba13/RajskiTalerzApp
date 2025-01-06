import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import styles from "./OrderNavButtons.module.css";
import { decOrderStep, incOrderStep } from "./orderSlice";

function OrderNavButtons({
  isPayment,
  prev,
  next,
  showNext,
  backwardStayOnStep,
  forwardStayOnStep,
  onClick,
}) {
  const dispatch = useDispatch();

  return (
    <div
      className={styles.buttons}
      style={!prev ? { alignSelf: "flex-end" } : {}}
    >
      {prev && (
        <Button
          to={prev}
          className="redBordersBtn"
          onClick={() =>
            !backwardStayOnStep ? dispatch(decOrderStep()) : null
          }
        >
          Powrót
        </Button>
      )}

      {showNext && (
        <Button
          to={next}
          onClick={() => (!forwardStayOnStep ? dispatch(incOrderStep()) : null)}
        >
          Dalej
        </Button>
      )}

      {isPayment && <Button onClick={onClick}>Zapłać</Button>}
    </div>
  );
}

export default OrderNavButtons;
