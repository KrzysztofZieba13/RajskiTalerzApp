import { useDispatch, useSelector } from "react-redux";
import CustomForm from "../../ui/CustomForm";
import OrderNavButtons from "./OrderNavButtons";
import OrderStepLayout from "./OrderStepLayout";
import { setDeliveryData } from "./orderSlice";
import { useEffect } from "react";

function DeliveryDataStep() {
  const { deliveryData } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(
    function () {
      function getPosition() {
        if (!navigator.geolocation)
          return dispatch(setDeliveryData({ coordinates: null }));

        navigator.geolocation.getCurrentPosition(
          (pos) =>
            dispatch(
              setDeliveryData({
                coordinates: {
                  lat: pos.coords.latitude,
                  lng: pos.coords.longitude,
                },
              })
            ),
          () => dispatch(setDeliveryData({ coordinates: null })),
          { enableHighAccuracy: true }
        );
      }
      getPosition();
    },
    [dispatch]
  );

  return (
    <>
      <OrderStepLayout>
        <CustomForm>
          <div>
            <label htmlFor="street">Ulica</label>
            <input
              id="street"
              type="text"
              value={deliveryData.street}
              onChange={(e) =>
                dispatch(setDeliveryData({ street: e.target.value }))
              }
            ></input>
          </div>
          <div>
            <label htmlFor="building">Nr. Budynku</label>
            <input
              id="building"
              type="number"
              value={deliveryData.buildingNumber || ""}
              onChange={(e) =>
                dispatch(
                  setDeliveryData({ buildingNumber: Number(e.target.value) })
                )
              }
            ></input>
          </div>
          <div>
            <label htmlFor="city">Miasto</label>
            <input
              id="city"
              type="text"
              value={deliveryData.city}
              onChange={(e) =>
                dispatch(setDeliveryData({ city: e.target.value }))
              }
            ></input>
          </div>
          <div>
            <label htmlFor="local-number">Numer lokalu</label>
            <input
              id="local-number"
              type="number"
              value={deliveryData.localNumber || null}
              onChange={(e) =>
                dispatch(
                  setDeliveryData({ localNumber: Number(e.target.value) })
                )
              }
            ></input>
          </div>
          <div>
            <label htmlFor="postal-code">Kod pocztowy</label>
            <input
              id="postal-code"
              type="text"
              value={deliveryData.postalCode}
              onChange={(e) =>
                dispatch(setDeliveryData({ postalCode: e.target.value }))
              }
            ></input>
          </div>
          <div>
            <label htmlFor="floor">Piętro</label>
            <input
              id="floor"
              type="number"
              value={deliveryData.floor || null}
              onChange={(e) =>
                dispatch(setDeliveryData({ floor: Number(e.target.value) }))
              }
            ></input>
          </div>
          <div style={{ alignItems: "flex-end" }}>
            <label htmlFor="comment">Komentarz</label>
            <textarea
              id="comment"
              value={deliveryData.deliveryComment}
              onChange={(e) =>
                dispatch(setDeliveryData({ deliveryComment: e.target.value }))
              }
            ></textarea>
          </div>
        </CustomForm>
      </OrderStepLayout>
      <OrderNavButtons
        prev="/new-order/personal-data"
        next="/new-order/payment-method"
        showNext={true}
        backwardStayOnStep={true}
      />
    </>
  );
}

export default DeliveryDataStep;
