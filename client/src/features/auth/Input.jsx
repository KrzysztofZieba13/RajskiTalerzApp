import { forwardRef } from "react";
import styles from "./Input.module.css";

function Input({ inputData, error, controlFn, controlValue }, ref) {
  return (
    <div>
      <label htmlFor={inputData.id}>{inputData.title}</label>
      <div className={styles.input}>
        {controlFn ? (
          <input
            id={inputData.id}
            type={inputData.type}
            value={controlValue}
            onChange={(e) => controlFn(e)}
          />
        ) : (
          <input ref={ref} id={inputData.id} type={inputData.type} />
        )}
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
}

export default forwardRef(Input);
