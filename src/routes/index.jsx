import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/auth/Login";
import MainLayout from "../layouts/MainLayout";
import Home from "../Pages/Home/Home";
import NriAppointment from "../Pages/services/NriAppointment";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [{ path: "/login", element: <Login /> }],
  },
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/nri-appointment", element: <NriAppointment /> },
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
