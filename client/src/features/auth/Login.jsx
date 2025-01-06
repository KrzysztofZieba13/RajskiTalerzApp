import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import CustomForm from "../../ui/CustomForm";
import FormPage from "../../ui/FormPage";
import styles from "./Auth.module.css";
import { useLoginMutation } from "../../services/auth";
import { useRef, useState } from "react";
import Input from "./Input";
import { useHandleMutation } from "../../hooks/useHandleMutation";
import { useSetTitle } from "../../hooks/useSetTitle";

function Login() {
  useSetTitle("Logowanie");
  const emailRef = useRef();
  const passwordRef = useRef();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { mutate: login, isLoading } = useHandleMutation(
    useLoginMutation(),
    "Zalogowano pomyślnie",
    "/"
  );

  function resetErrors() {
    setEmailError("");
    setPasswordError("");
  }

  function handleLogin(e) {
    e.preventDefault();
    resetErrors();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    let isError = false;

    if (!email) {
      setEmailError("Wypełnij pole email");
      isError = true;
    }
    if (!password) {
      setPasswordError("Wypełnij pole hasło");
      isError = true;
    }
    if (isError) return;

    const data = {
      email,
      password,
    };

    login(data);
  }

  return (
    <>
      <FormPage
        img={
          <img src="../auth-img.jpg" alt="Obraz przedstawiający logowanie" />
        }
        subtitle="Witaj ponownie"
        title="Logowanie"
      >
        <CustomForm onSubmit={handleLogin}>
          <Input
            inputData={{ id: "email", title: "Email", type: "email" }}
            ref={emailRef}
            error={emailError}
          />
          <Input
            inputData={{ id: "password", title: "Hasło", type: "password" }}
            ref={passwordRef}
            error={passwordError}
          />
          <Button bgColor="#ee4e4e" size="md">
            {isLoading ? "Logowanie..." : "Zaloguj"}
          </Button>
        </CustomForm>
        <p className={styles.switchAuth}>
          Nie masz konta? <Link to="/auth/sign-up">Zarejestruj się</Link>
        </p>
        <p className={styles.switchAuth}>
          Nie pamiętasz hasła?{" "}
          <Link to="/auth/forgot-password">Zapomniałem hasła</Link>
        </p>
      </FormPage>
    </>
  );
}

export default Login;
