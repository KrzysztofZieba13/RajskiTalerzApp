import { useRef, useState } from "react";
import Button from "../../ui/Button";
import CustomForm from "../../ui/CustomForm";
import Input from "../auth/Input";
import { useHandleMutation } from "../../hooks/useHandleMutation";
import { useUpdateMyPasswordMutation } from "../../services/users";

function UserPasswordUpdate() {
  const [password, setPassword] = useState("");
  const [passwordCurrentError, setPasswordCurrentError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const passwordCurrentRef = useRef("");
  const passwordConfirmRef = useRef("");

  const { mutate: updateMyPassword, isLoading: isUpdating } = useHandleMutation(
    useUpdateMyPasswordMutation(),
    "Zmieniono hasło"
  );

  function resetErrors() {
    setPasswordError("");
    setPasswordCurrentError("");
    setPasswordConfirmError("");
  }

  function clearFields() {
    setPassword("");
    passwordConfirmRef.current.value = "";
    passwordCurrentRef.current.value = "";
  }

  function handleUpdate(e) {
    e.preventDefault();

    const passwordCurrent = passwordCurrentRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;
    let isError = false;

    resetErrors();

    if (!passwordCurrent) {
      setPasswordCurrentError("Wypełnij pole Aktualne hasło");
      isError = true;
    }
    if (!password || password.length < 8) {
      setPasswordError("Hasło minimum 8 znaków");
      isError = true;
    }
    if (!passwordConfirm) {
      setPasswordConfirmError("Wypełnij pole Potwierdź hasło");
      isError = true;
    }
    if (password !== passwordConfirm) {
      setPasswordError("Hasła są różne");
      setPasswordConfirmError("Hasła są różne");
      isError = true;
    }

    if (isError) return;

    const data = {
      passwordCurrent,
      password,
      passwordConfirm,
    };

    updateMyPassword(data);

    clearFields();
  }

  return (
    <div>
      <h1>Zmiana hasła</h1>
      <CustomForm onSubmit={handleUpdate}>
        <Input
          ref={passwordCurrentRef}
          inputData={{
            id: "current-password",
            title: "Aktualne hasło",
            type: "password",
          }}
          error={passwordCurrentError}
        />
        <Input
          inputData={{ id: "password", title: "Nowe hasło", type: "password" }}
          error={passwordError}
          controlValue={password}
          controlFn={(e) => setPassword(e.target.value)}
        />
        <Input
          ref={passwordConfirmRef}
          inputData={{
            id: "password-confirm",
            title: "Potwierdź hasło",
            type: "password",
          }}
          error={passwordConfirmError}
        />
        <Button disabled={isUpdating}>
          {isUpdating ? "Aktualizowanie..." : "Aktualizuj"}
        </Button>
      </CustomForm>
    </div>
  );
}

export default UserPasswordUpdate;
