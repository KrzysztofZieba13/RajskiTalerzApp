import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./features/home/Home";
import Menu from "./features/menu/Menu";
import SignUp from "./features/auth/SignUp";
import Login from "./features/auth/Login";
import Booking from "./features/booking/Booking";
import NewOrder from "./features/order/NewOrder";
import OrderChooseDeliveryStep from "./features/order/OrderChooseDeliveryStep";
import OrderPriorityStep from "./features/order/OrderPriorityStep";
import PersonalDataStep from "./features/order/PersonalDataStep";
import DeliveryDataStep from "./features/order/DeliveryDataStep";
import PaymentMethodStep from "./features/order/PaymentMethodStep";
import UserDashboard from "./features/user/UserDashboard";
import UserData from "./features/user/UserData";
import OrderHistory from "./features/user/OrderHistory";
import Kitchen from "./features/kitchen/Kitchen";
import ProtectedRoute from "./utils/ProtectedRoute";
import KitchenContent from "./features/kitchen/KitchenContent";
import KitchenOrdersArchive from "./features/kitchen/KitchenOrdersArchive";
import ErrorPage from "./ui/ErrorPage";
import Delivery from "./features/delivery/Delivery";
import DeliveryContent from "./features/delivery/DeliveryContent";
import Waiter from "./features/waiter/Waiter";
import WaiterOrders from "./features/waiter/WaiterOrders";
import WaiterBookings from "./features/waiter/WaiterBookings";
import AdminCharts from "./features/admin/AdminCharts";
import Admin from "./features/admin/Admin";
import AdminEmployees from "./features/admin/AdminEmployees";
import AdminEditMenu from "./features/admin/AdminEditMenu";
import UserPasswordUpdate from "./features/user/UserPasswordUpdate";
import UserNonPasswordUpdate from "./features/user/UserNonPasswordUpdate";
import OrderFeedback from "./features/order/OrderFeedback";
import ForgotPassword from "./features/auth/ForgotPassword";
import ResetPassword from "./features/auth/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          {/* CLIENT APP */}
          <Route index element={<Home />} />
          <Route path="menu/:category" element={<Menu />} />
          <Route path="auth">
            <Route index element={<Navigate replace to="login" />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="booking" element={<Booking />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="new-order" element={<NewOrder />}>
              <Route
                index
                element={<Navigate replace to="choose-delivery" />}
              />
              <Route
                path="choose-delivery"
                element={<OrderChooseDeliveryStep />}
              />
              <Route path="order-priority" element={<OrderPriorityStep />} />
              <Route path="personal-data" element={<PersonalDataStep />} />
              <Route path="delivery-data" element={<DeliveryDataStep />} />
              <Route path="payment-method" element={<PaymentMethodStep />} />
            </Route>
            <Route
              path="order-success"
              element={<OrderFeedback status="success" />}
            />
            <Route
              path="order-fail"
              element={<OrderFeedback status="fail" />}
            />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="user" element={<UserDashboard />}>
              <Route index element={<Navigate replace to="user-data" />} />
              <Route path="user-data" element={<UserData />}>
                <Route
                  path="update-name"
                  element={
                    <UserNonPasswordUpdate title="Zmiana imienia" type="name" />
                  }
                />
                <Route
                  path="update-surname"
                  element={
                    <UserNonPasswordUpdate
                      title="Zmiana nazwiska"
                      type="surname"
                    />
                  }
                />
                <Route
                  path="update-email"
                  element={
                    <UserNonPasswordUpdate title="Zmiana email" type="email" />
                  }
                />
                <Route
                  path="update-password"
                  element={<UserPasswordUpdate />}
                />
              </Route>
              <Route path="order-history" element={<OrderHistory />} />
            </Route>
          </Route>
          <Route path="error" element={<ErrorPage />} />
        </Route>
        {/* KITCHEN APP */}
        <Route element={<ProtectedRoute restrictTo="cook" />}>
          <Route path="kitchen" element={<Kitchen />}>
            <Route index element={<Navigate to="orders" replace />} />
            <Route path="orders" element={<KitchenContent />} />
            <Route path="orders-archive" element={<KitchenOrdersArchive />} />
          </Route>
        </Route>
        {/* DELIVERYGUY APP */}
        <Route element={<ProtectedRoute restrictTo="deliveryGuy" />}>
          <Route path="delivery">
            <Route index element={<Navigate to="all" replace />} />
            <Route path=":sortedBy" element={<Delivery />}>
              <Route index element={<DeliveryContent />} />
            </Route>
          </Route>
        </Route>
        {/* WAITER APP */}
        <Route element={<ProtectedRoute restrictTo="waiter" />}>
          <Route path="waiter" element={<Waiter />}>
            <Route index element={<Navigate to="orders" replace />} />
            <Route path="orders" element={<WaiterOrders />} />
            <Route path="bookings" element={<WaiterBookings />} />
          </Route>
        </Route>
        {/* ADMIN APP */}
        <Route element={<ProtectedRoute restrictTo="admin" />}>
          <Route path="admin" element={<Admin />}>
            <Route index element={<Navigate to="charts" replace />} />
            <Route path="charts" element={<AdminCharts />} />
            <Route path="employees" element={<AdminEmployees />} />
            <Route path="edit-menu" element={<AdminEditMenu />} />
          </Route>
          <Route path="orders" element={<Kitchen />}>
            <Route path="orders-archive" element={<KitchenOrdersArchive />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
