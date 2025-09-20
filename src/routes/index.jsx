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
import NriAppointmentBooking from "../Pages/services/NriAppointments/NriAppointmentBooking";

import BookPooja from "../Pages/services/BookPooja";
import NriAppointment from "../Pages/dashboard/nriAppointment/NriAppointment";

import ComingSoon from "../Pages/static/CommingSoon";
import VastuServices from "../Pages/services/VastuServices";
import UpcomingFestivals from "../Pages/services/UpcomingFestivals";
import Gallery from "../Pages/services/Gallery";
import LivePrograms from "../Pages/services/LivePrograms";
import NotFound from "../Pages/static/NotFound";
import Users from "../Pages/dashboard/users/Users";
import PrivacyPolicy from "../Pages/static/PrivacyPolicy";
import TermsAndConditions from "../Pages/static/TermsAndConditions ";
import Disclaimer from "../Pages/static/Disclaimer";

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
      { path: "/nri-appointment-booking", element: <NriAppointmentBooking /> },
      { path: "/email-horoscope", element: <EmailHoroscope /> },
      { path: "/vastu-services", element: <VastuServices /> },
      { path: "/upcoming-festivals", element: <UpcomingFestivals /> },
      { path: "/book-pooja", element: <BookPooja /> },
      { path: "/gallery", element: <Gallery /> },
      { path: "/live-programs", element: <LivePrograms /> },
    ],
  },

  {
    path: "/dashboard",
    element: requireAuth() || <DashboardLayout />,
    children: [
      { path: "nri-appointment", element: <NriAppointment /> },
      { path: "users", element: <Users /> },
    ],
  },

  { path: "/*", element: <NotFound /> },
  { path: "/comming-soon", element: <ComingSoon /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
  { path: "/terms-and-conditions", element: <TermsAndConditions /> },
  { path: "/disclaimer", element: <Disclaimer /> },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
