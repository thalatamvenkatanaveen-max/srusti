import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/auth/Login";
import MainLayout from "../layouts/MainLayout";
import Home from "../Pages/Home/Home";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [{ path: "/login", element: <Login /> }],
  },
  {
    element: <MainLayout />,
    children: [{ path: "/", element: <Home /> }],
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
