import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showAlert } from "../features/alert/alertSlice";
import { useNavigate } from "react-router-dom";

export function useHandleMutation(mutation, successMessage, navigateTo) {
  const [mutate, { isSuccess, isError, error, isLoading, reset }] = mutation;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (isSuccess) {
        dispatch(showAlert({ message: successMessage, status: "success" }));
        if (navigateTo) navigate(navigateTo);
        reset();
      }
    },
    [isSuccess, dispatch, successMessage, navigate, navigateTo, reset]
  );

  useEffect(
    function () {
      if (isError) {
        dispatch(
          showAlert({
            message: error?.data?.message || "Wystąpił błąd",
            status: "error",
          })
        );
      }
    },
    [dispatch, error?.data?.message, isError]
  );

  return { mutate, isLoading, isError, error, isSuccess };
}
