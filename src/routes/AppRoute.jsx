import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AppLayout from "../components/layout/AppLayout";
export default function AppRoute() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
            {/* Feature Route Here */}
        </Route>
      </Route>
    </Routes>
  );
}
