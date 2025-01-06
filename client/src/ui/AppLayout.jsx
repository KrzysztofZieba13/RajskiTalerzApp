import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Alert from "../features/alert/Alert";
import { useSelector } from "react-redux";

function AppLayout() {
  const { isVisible: isAlert } = useSelector((state) => state.alert);

  return (
    <main>
      {isAlert && <Alert />}
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}

export default AppLayout;
