import CustomForm from "../../ui/CustomForm";
import OptionBtn from "./OptionBtn";
import OrderStepLayout from "./OrderStepLayout";
import styles from "./OrderPriorityStep.module.css";
import OrderNavButtons from "./OrderNavButtons";
import { useDispatch, useSelector } from "react-redux";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { setOrderPriority, setTableNumber, setOrderOnDate } from "./orderSlice";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";

function OrderPriorityStep() {
  const { orderPriority, deliveryMethod, tableNumber, orderOnDate } =
    useSelector((state) => state.order);
  const dispatch = useDispatch();

  return (
    <>
      <OrderStepLayout>
        <div className={styles.orderPriorityStep}>
          {deliveryMethod !== "stolik" && (
            <div className={styles.optionBtns}>
              <OptionBtn
                isActive={orderPriority === "asap"}
                onClick={() => dispatch(setOrderPriority("asap"))}
              >
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
                    d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
                  />
                </svg>
                ASAP
              </OptionBtn>
              <OptionBtn
                isActive={orderPriority === "on-time"}
                onClick={() => dispatch(setOrderPriority("on-time"))}
              >
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
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Na czas
              </OptionBtn>
            </div>
          )}

          {orderPriority === "on-time" && (
            <div className={styles.datePicker}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <label>Data</label>
                <DateTimePicker
                  value={dayjs(orderOnDate)}
                  onChange={(value) =>
                    dispatch(setOrderOnDate(value.$d.toISOString()))
                  }
                  slotProps={{
                    textField: {
                      inputProps: { placeholder: "" },
                      sx: {
                        "& .MuiInputBase-input": {
                          fontSize: "2.4rem",
                          textAlign: "right",
                          paddingBottom: "0",
                        },
                        "& .MuiOutlinedInput-root": {
                          border: "none",
                          "& fieldset": {
                            border: "none",
                          },
                          paddingBottom: "0",
                        },
                      },
                    },
                    openPickerIcon: {
                      sx: {
                        fontSize: "3.2rem",
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </div>
          )}
          {deliveryMethod === "stolik" && (
            <CustomForm>
              <div className={styles.selectDate}>
                <label htmlFor="table">Numer stolika</label>
                <select
                  id="table"
                  onChange={(e) => dispatch(setTableNumber(e.target.value))}
                >
                  <option>wybierz</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={7}>8</option>
                  <option value={7}>9</option>
                  <option value={10}>10</option>
                </select>
              </div>
            </CustomForm>
          )}
        </div>
      </OrderStepLayout>

      <OrderNavButtons
        prev="/new-order/choose-delivery"
        next="/new-order/personal-data"
        showNext={orderPriority || tableNumber}
      />
    </>
  );
}

export default OrderPriorityStep;
