import { useRef, useState } from "react";
import Button from "../../ui/Button";
import CustomForm from "../../ui/CustomForm";
import FormPage from "../../ui/FormPage";
import Input from "./Input";
import { Link } from "react-router-dom";
import styles from "./Auth.module.css";
import { useForgotPasswordMutation } from "../../services/users";
import { useHandleMutation } from "../../hooks/useHandleMutation";
import { useSetTitle } from "../../hooks/useSetTitle";

function ForgotPassword() {
  useSetTitle("Zapomniałem hasła");
  const emailRef = useRef();
  const [emailError, setEmailError] = useState("");
  const { mutate: forgotPassword, isLoading } = useHandleMutation(
    useForgotPasswordMutation(),
    "Wysłano token na email"
  );

  function handleForgot(e) {
    e.preventDefault();
    setEmailError("");

    const email = emailRef.current.value;
    let isError = false;

    if (!email) {
      setEmailError("Wypełnij pole email");
      isError = true;
    }

    if (isError) return;

    const data = {
      email,
    };

    forgotPassword(data);
  }

  return (
    <>
      <FormPage
        img={
          <img src="../auth-img.jpg" alt="Obraz przedstawiający logowanie" />
        }
        subtitle="Zapomniałeś hasła? Wypełnij formularz"
        title="Zapomniałem hasła"
      >
        <CustomForm onSubmit={handleForgot}>
          <Input
            inputData={{ id: "email", title: "Email", type: "email" }}
            ref={emailRef}
            error={emailError}
          />
          <Button bgColor="#ee4e4e" size="md">
            {isLoading ? "Wysyłanie..." : "Wyślij"}
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

export default ForgotPassword;
