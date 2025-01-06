import { useReducer, useRef, useState } from "react";
import Button from "../../ui/Button";
import CustomForm from "../../ui/CustomForm";
import Input from "../auth/Input";
import styles from "./AdminAddEmployeeContainer.module.css";
import { useHandleMutation } from "../../hooks/useHandleMutation";
import { useCreateEmployeeMutation } from "../../services/auth";

const initalErrorState = {
  nameError: "",
  surnameError: "",
  emailError: "",
  roleError: "",
  passwordError: "",
  passwordConfirmError: "",
};

function employeeReducer(state, action) {
  switch (action.type) {
    case "setError": {
      return {
        ...state,
        [action.payload.field]: action.payload.message,
      };
    }
    case "resetErrors": {
      return initalErrorState;
    }
    default:
      return state;
  }
}

function AdminAddEmployeeContainer() {
  const nameRef = useRef("");
  const surnameRef = useRef("");
  const emailRef = useRef("");
  const roleRef = useRef("");
  const passwordConfirmRef = useRef("");
  const [password, setPassword] = useState("");

  const [state, dispatch] = useReducer(employeeReducer, initalErrorState);

  const { mutate: createEmployee, isLoading } = useHandleMutation(
    useCreateEmployeeMutation(),
    "Utworzono pracownika"
  );

  function handleCreateEmployee(e) {
    e.preventDefault();

    const name = nameRef.current.value;
    const surname = surnameRef.current.value;
    const email = emailRef.current.value;
    const role = roleRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;
    let isError = false;

    dispatch({ type: "resetErrors" });

    if (!name) {
      dispatch({
        type: "setError",
        payload: { field: "nameError", message: "Wypełnij pole Imię" },
      });
      isError = true;
    }
    if (!surname) {
      dispatch({
        type: "setError",
        payload: { field: "surnameError", message: "Wypełnij pole Nazwisko" },
      });
      isError = true;
    }
    if (!email) {
      dispatch({
        type: "setError",
        payload: { field: "emailError", message: "Wypełnij pole Email" },
      });
      isError = true;
    }
    if (!role) {
      dispatch({
        type: "setError",
        payload: { field: "roleError", message: "Wypełnij pole Rola" },
      });
      isError = true;
    }
    if (!password) {
      dispatch({
        type: "setError",
        payload: { field: "passwordError", message: "Wypełnij pole Hasło" },
      });
      isError = true;
    }
    if (!passwordConfirm) {
      dispatch({
        type: "setError",
        payload: {
          field: "passwordConfirmError",
          message: "Wypełnij pole Powtórz hasło",
        },
      });
      isError = true;
    }
    if (isError) return;

    const data = {
      name: nameRef.current.value,
      surname: surnameRef.current.value,
      email: emailRef.current.value,
      role: roleRef.current.value,
      password,
      passwordConfirm: passwordConfirmRef.current.value,
    };

    console.log(data);
    createEmployee(data);
  }

  return (
    <div className={styles.adminAddEmployeeContainer}>
      <h2>Dodaj pracownika</h2>
      <CustomForm onSubmit={handleCreateEmployee}>
        <Input
          ref={nameRef}
          inputData={{ id: "name", title: "Imię", type: "text" }}
          error={state.nameError}
        />
        <Input
          ref={surnameRef}
          inputData={{ id: "surname", title: "Nazwisko", type: "text" }}
          error={state.surnameError}
        />
        <Input
          ref={emailRef}
          inputData={{ id: "email", title: "Email", type: "email" }}
          error={state.emailError}
        />
        <Input
          inputData={{ id: "password", title: "Hasło", type: "password" }}
          error={state.passwordError}
          controlValue={password}
          controlFn={(e) => setPassword(e.target.value)}
        />
        <Input
          ref={passwordConfirmRef}
          inputData={{
            id: "passwordConfirm",
            title: "Powtórz hasło",
            type: "password",
          }}
          error={state.passwordConfirmError}
        />
        <div className={styles.select}>
          <label htmlFor="role">Rola</label>
          <select id="role" ref={roleRef}>
            <option value="deliveryGuy">Dostawca</option>
            <option value="waiter">Kelner</option>
            <option value="cook">Kucharz</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <Button disabled={isLoading}>
          {isLoading ? "Dodawanie..." : "Dodaj"}
        </Button>
      </CustomForm>
    </div>
  );
}

export default AdminAddEmployeeContainer;
