import { useDispatch, useSelector } from "react-redux";
import OptionBtn from "./OptionBtn";
import OrderNavButtons from "./OrderNavButtons";
import OrderStepLayout from "./OrderStepLayout";
import { setPaymentMethod } from "./orderSlice";
import { useCreateCheckoutOrderMutation } from "../../services/orders";

import styles from "./PaymentMethodStep.module.css";
import Spinner from "../../ui/Spinner";
import LoyaltyPoints from "./LoyaltyPoints";
import OptionBtnsWrapper from "./OptionBtnsWrapper";
import { useEffect } from "react";

function PaymentMethodStep() {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const cart = useSelector((state) => state.cart.cart);
  const transformedCart = cart.map((item) => ({
    product: item.itemId,
    ...item,
  }));
  const [createOrder, { data, isLoading }] = useCreateCheckoutOrderMutation();

  function handleOrder() {
    const data = {
      products: transformedCart,
      ...order,
    };

    if (order.paymentMethod === "online")
      createOrder({ route: "create-checkout-session", data });
    else createOrder({ route: "create-order", data });
  }

  useEffect(
    function () {
      if (data) console.log(data);
      if (data?.url || null) window.location = data.url;
    },
    [data]
  );

  return (
    <>
      <OrderStepLayout>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className={styles.paymentMethodStep}>
            <OptionBtnsWrapper>
              <OptionBtn
                isActive={order.paymentMethod === "gotówka"}
                onClick={() => dispatch(setPaymentMethod("gotówka"))}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                  />
                </svg>
                Gotówka
              </OptionBtn>
              <OptionBtn
                isActive={order.paymentMethod === "card"}
                onClick={() => dispatch(setPaymentMethod("card"))}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                  />
                </svg>
                Karta
              </OptionBtn>
              <OptionBtn
                isActive={order.paymentMethod === "online"}
                onClick={() => dispatch(setPaymentMethod("online"))}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                  />
                </svg>
                Przelew
              </OptionBtn>
            </OptionBtnsWrapper>
            <LoyaltyPoints />
          </div>
        )}
      </OrderStepLayout>
      <OrderNavButtons
        prev={`${
          order.deliveryMethod === "dostawa"
            ? "/new-order/delivery-data"
            : "/new-order/personal-data"
        }`}
        isPayment={true}
        onClick={handleOrder}
      />
    </>
  );
}

export default PaymentMethodStep;
