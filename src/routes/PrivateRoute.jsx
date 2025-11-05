import useAuth from "../hooks/useAuth";
import { replace, useNavigate } from "react-router-dom";
import PopupNotification from "../components/common/PopupNotification";
import LoadingScreen from "../components/common/LoadingScreen";
/**
 * This component is used for check if user was log in or not
 * If not, redirect user to /auth/login
 * @returns
 */
import { Outlet } from "react-router-dom";
import { ROUTES } from "../constant";
export default function PrivateRoute() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <LoadingScreen control={loading}/>;
  }
  if (!isAuthenticated) {
    return (
        <PopupNotification
          title={"Bạn chưa đăng nhập!"}
          content={"Vui lòng quay về trang đăng nhập"}
          open={true}
          onClose={() => navigate(ROUTES.LOGIN, replace)}
          btnTitle={"Quay về đăng nhập"}
        />
    );
  }
  return <Outlet />;
}
