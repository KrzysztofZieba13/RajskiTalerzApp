import { useDispatch, useSelector } from "react-redux";
import OrderNavButtons from "./OrderNavButtons";
import OrderStepLayout from "./OrderStepLayout";
import { setClientData } from "./orderSlice";
import { useIsLoggedInQuery } from "../../services/auth";
import { useEffect } from "react";
import Spinner from "../../ui/Spinner";
import ClientPersonalDataForm from "./ClientPersonalDataForm";
import WaiterClientWillBill from "./WaiterClientWillBill";

function PersonalDataStep() {
  const { deliveryMethod } = useSelector((state) => state.order);
  const { data, isLoading } = useIsLoggedInQuery();
  const dispatch = useDispatch();

  useEffect(
    function () {
      if (data?.user.role === "waiter") return;
      dispatch(
        setClientData({
          name: data?.user?.name ?? "",
          email: data?.user?.email ?? "",
        })
      );
    },
    [data, dispatch]
  );

  if (isLoading)
    return (
      <OrderStepLayout>
        <Spinner />
      </OrderStepLayout>
    );

  const isWaiterOrAdmin =
    data.user.role === "waiter" || data.user.role === "admin";

  return (
    <>
      <OrderStepLayout>
        {!isWaiterOrAdmin && <ClientPersonalDataForm />}
        {isWaiterOrAdmin && <WaiterClientWillBill />}
      </OrderStepLayout>
      <OrderNavButtons
        prev="/new-order/order-priority"
        next={`${
          deliveryMethod === "dostawa"
            ? "/new-order/delivery-data"
            : "/new-order/payment-method"
        }`}
        showNext={true}
        forwardStayOnStep={deliveryMethod === "dostawa"}
      />
    </>
  );
}

export default PersonalDataStep;
