import { useDispatch, useSelector } from "react-redux";
import OptionBtn from "./OptionBtn";
import OptionBtnsWrapper from "./OptionBtnsWrapper";
import styles from "./WaiterClientWillBill.module.css";
import { setBillOption, setClientData, setOrderComment } from "./orderSlice";
import CustomForm from "../../ui/CustomForm";
import { useEffect } from "react";

function WaiterClientWillBill() {
  const { clientData, billOption, orderComment } = useSelector(
    (state) => state.order
  );
  const dispatch = useDispatch();

  useEffect(
    function () {
      dispatch(setClientData({ name: "Waiter" }));
    },
    [dispatch]
  );

  //FIXME: nie działa dla kelnera składającego zamówienie z rachunkiem klasycznym (bez wysłania na email)
  useEffect(
    function () {
      if (billOption === "classic")
        dispatch(setClientData({ email: "waiter@rajskitalerz.pl" }));
    },
    [dispatch, billOption]
  );

  return (
    <div className={styles.waiterClientWillBill}>
      <OptionBtnsWrapper>
        <OptionBtn
          isActive={billOption === "classic"}
          onClick={() => dispatch(setBillOption("classic"))}
        >
          Rachunek Klasyczny
        </OptionBtn>
        <OptionBtn
          isActive={billOption === "email"}
          onClick={() => dispatch(setBillOption("email"))}
        >
          Rachunek Klasyczny + Email
        </OptionBtn>
      </OptionBtnsWrapper>
      <CustomForm>
        <>
          {billOption === "email" && (
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={clientData.email}
                onChange={(e) =>
                  dispatch(setClientData({ email: e.target.value }))
                }
              ></input>
            </div>
          )}
          <div style={{ alignItems: "flex-end" }}>
            <label htmlFor="comment">Komentarz</label>
            <textarea
              id="comment"
              value={orderComment}
              onChange={(e) => dispatch(setOrderComment(e.target.value))}
            ></textarea>
          </div>
        </>
      </CustomForm>
    </div>
  );
}

export default WaiterClientWillBill;
