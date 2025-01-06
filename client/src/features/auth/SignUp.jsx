import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import CustomForm from "../../ui/CustomForm";
import FormPage from "../../ui/FormPage";
import styles from "./Auth.module.css";
import { useReducer, useRef, useState } from "react";
import { useSignupMutation } from "../../services/auth";
import Input from "./Input";
import { useHandleMutation } from "../../hooks/useHandleMutation";
import { useSetTitle } from "../../hooks/useSetTitle";

const initalErrorState = {
  nameError: "",
  surnameError: "",
  emailError: "",
  passwordError: "",
  passwordConfirmError: "",
};

function formReducer(state, action) {
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

function SignUp() {
  useSetTitle("Rejestacja");
  const nameRef = useRef("");
  const surnameRef = useRef("");
  const emailRef = useRef("");
  const passwordConfirmRef = useRef("");
  const [password, setPassword] = useState("");

  const [state, dispatch] = useReducer(formReducer, initalErrorState);

  const { mutate: signup, isLoading } = useHandleMutation(
    useSignupMutation(),
    "Zarejestrowano pomyślnie",
    "/"
  );

  function handleSignup(e) {
    e.preventDefault();

    const name = nameRef.current.value;
    const surname = surnameRef.current.value;
    const email = emailRef.current.value;
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
      password,
      passwordConfirm: passwordConfirmRef.current.value,
    };

    signup(data);
  }

  return (
    <FormPage
      img={<img src="../auth-img.jpg" alt="Obraz przedstawiający logowanie" />}
      subtitle="Dołącz do nas"
      title="Rejestracja"
    >
      <CustomForm onSubmit={handleSignup}>
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
        <Button bgColor="#ee4e4e" size="md">
          {isLoading ? "Rejestracja..." : "Zarejestruj"}
        </Button>
      </CustomForm>
      <p className={styles.switchAuth}>
        Masz już konto? <Link to="/auth/login">Zaloguj się</Link>
      </p>
    </FormPage>
  );
}

export default SignUp;
