import { useRef } from "react";
import Button from "../../ui/Button";
import CustomForm from "../../ui/CustomForm";
import { useHandleMutation } from "../../hooks/useHandleMutation";
import { useUpdateMeMutation } from "../../services/users";

function UserNonPasswordUpdate({ title, type }) {
  const dataRef = useRef("");
  const { mutate: update, isLoading: isUpdating } = useHandleMutation(
    useUpdateMeMutation(),
    "Dane zostały zaktualizowane"
  );

  const isEmail = type.toLowerCase() === "email";

  function handleUpdate(e) {
    e.preventDefault();
    const updateObj = { [type]: dataRef.current.value };
    update(updateObj);
    dataRef.current.value = "";
  }

  return (
    <div>
      <h1>{title}</h1>
      <CustomForm onSubmit={handleUpdate}>
        <div>
          <label htmlFor={`data-${type}`}>Wprowadź dane</label>
          <input
            id={`data-${type}`}
            type={isEmail ? "email" : "text"}
            ref={dataRef}
          />
        </div>
        <Button disabled={isUpdating}>
          {isUpdating ? "Aktualizowanie..." : "Aktualizuj"}
        </Button>
      </CustomForm>
    </div>
  );
}

export default UserNonPasswordUpdate;
