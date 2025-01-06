import { useRef, useState } from "react";
import Button from "../../ui/Button";
import CustomForm from "../../ui/CustomForm";
import FormPage from "../../ui/FormPage";
import Input from "./Input";
import { Link, useParams } from "react-router-dom";
import styles from "./Auth.module.css";
import { useHandleMutation } from "../../hooks/useHandleMutation";
import { useResetPasswordMutation } from "../../services/users";
import { useSetTitle } from "../../hooks/useSetTitle";

function ResetPassword() {
  useSetTitle("Resetowanie hasła");
  const params = useParams();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const { mutate: resetPassword, isLoading } = useHandleMutation(
    useResetPasswordMutation(),
    "Hasło zresetowane",
    "/"
  );

  function resetErrors() {
    setPasswordError("");
    setPasswordConfirmError("");
  }

  function handleReset(e) {
    e.preventDefault();
    resetErrors();

    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;

    let isError = false;

    if (!password) {
      setPasswordError("Wypełnij pole hasło");
      isError = true;
    }
    if (!password) {
      setPasswordConfirmError("Wypełnij pole hasło");
      isError = true;
    }
    if (password !== passwordConfirm) {
      setPasswordError("Hasła są różne");
      setPasswordConfirmError("Hasła są różne");
      isError = true;
    }

    if (isError) return;

    const data = {
      password,
      passwordConfirm,
    };
    const token = params.token;
    resetPassword({ data, token });
  }

  return (
    <>
      <FormPage
        img={<img src="/auth-img.jpg" alt="Obraz przedstawiający logowanie" />}
        subtitle="Wypełnij pola by ustawić nowe hasło"
        title="Reset hasła"
      >
        <CustomForm onSubmit={handleReset}>
          <Input
            inputData={{ id: "password", title: "Hasło", type: "password" }}
            ref={passwordRef}
            error={passwordError}
          />
          <Input
            inputData={{
              id: "passwordConfirm",
              title: "Powtórz hasło",
              type: "password",
            }}
            ref={passwordConfirmRef}
            error={passwordConfirmError}
          />
          <Button bgColor="#ee4e4e" size="md">
            {isLoading ? "Resetowanie..." : "Resetuj"}
          </Button>
        </CustomForm>
        <p className={styles.switchAuth}>
          Nie masz konta? <Link to="/auth/sign-up">Zarejestruj się</Link>
        </p>
        <p className={styles.switchAuth}>
          Masz konto?
          <Link to="/auth/login"> Zaloguj</Link>
        </p>
      </FormPage>
    </>
  );
}

export default ResetPassword;
