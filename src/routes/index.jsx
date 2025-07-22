import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Login from "../Pages/auth/Login";

import Home from "../Pages/Home/Home";
import EmailHoroscope from "../Pages/services/EmailHoroScope";

import AddFestival from "../Pages/dashboard/AddFestival";
import AddEvents from "../Pages/dashboard/AddEvents";
import BookPooja from "../Pages/services/BookPooja";
import Pooja from "../Pages/dashboard/pooja/Pooja";
import NriAppointment from "../Pages/dashboard/nriAppointment/NriAppointment";

function requireAuth() {
  // const token = localStorage.getItem("authToken");
  const token = true;
  return token ? null : <Navigate to="/login" replace />;
}

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [{ path: "/login", element: <Login /> }],
  },
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      // { path: "/nri-appointment", element: <NriAppointment /> },
      { path: "/email-horoscope", element: <EmailHoroscope /> },
      { path: "/book-pooja", element: <BookPooja /> },
    ],
  },
  {
    path: "/dashboard",
    element: requireAuth() || <DashboardLayout />,
    children: [
      { path: "pooja", element: <Pooja /> },
      { path: "add-festival", element: <AddFestival /> },
      { path: "nri-appointment", element: <NriAppointment /> },
      { path: "add-live-events", element: <AddEvents /> },
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
