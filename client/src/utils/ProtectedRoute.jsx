import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useIsLoggedInQuery } from "../services/auth";
import Spinner from "../ui/Spinner";
import { useSelector } from "react-redux";
import Alert from "../features/alert/Alert";

function ProtectedRoute({ restrictTo }) {
  const { data, isLoading } = useIsLoggedInQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  const location = useLocation();
  const { isVisible: isAlert } = useSelector((state) => state.alert);
  if (isLoading)
    return (
      <div style={{ minHeight: "70vh", position: "relative" }}>
        <Spinner />
      </div>
    );

  if (!data.user) return <Navigate to={"/auth/login"} replace />;

  if (restrictTo && restrictTo !== data.user.role && data.user.role !== "admin")
    return (
      <Navigate
        to={"/error"}
        state={{
          message: `Nie masz uprawnień aby dostać się do ${location.pathname}`,
        }}
      />
    );

  return (
    <div>
      {isAlert && <Alert />}
      <Outlet />
    </div>
  );
}

export default ProtectedRoute;
