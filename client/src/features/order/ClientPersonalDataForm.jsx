import { useDispatch, useSelector } from "react-redux";
import CustomForm from "../../ui/CustomForm";
import { setClientData, setOrderComment } from "./orderSlice";

function ClientPersonalDataForm() {
  const { clientData, orderComment } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  return (
    <CustomForm>
      <div>
        <label htmlFor="name">Imię</label>
        <input
          id="name"
          type="text"
          value={clientData.name}
          onChange={(e) => dispatch(setClientData({ name: e.target.value }))}
        ></input>
      </div>
      <div>
        <label htmlFor="phone">Telefon</label>
        <input
          id="phone"
          type="tel"
          value={clientData.telephone || ""}
          onChange={(e) =>
            dispatch(setClientData({ telephone: e.target.value }))
          }
        ></input>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={clientData.email}
          onChange={(e) => dispatch(setClientData({ email: e.target.value }))}
        ></input>
      </div>
      <div style={{ alignItems: "flex-end" }}>
        <label htmlFor="comment">Komentarz</label>
        <textarea
          id="comment"
          value={orderComment}
          onChange={(e) => dispatch(setOrderComment(e.target.value))}
        ></textarea>
      </div>
    </CustomForm>
  );
}

export default ClientPersonalDataForm;
