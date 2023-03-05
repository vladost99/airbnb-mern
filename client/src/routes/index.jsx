import PrivateRoute from "../components/PrivateRoute";
import IndexPage from "../pages/IndexPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/Profile";
import RegisterPage from "../pages/RegisterPage";
import MyListPlaces from "../pages/MyListPlaces";
import PlaceForm from "../pages/PlaceForm";
import BookingsPage from "./../pages/BookingsPage";
import BookingPage from "./../pages/BookingPage";
import PlacePage from "../pages/PlacePage";
import { Navigate, Route } from "react-router-dom";

export const routerLink = {
  home: "/",
  login: "/login",
  register: "/register",
  place: (id) => `place/${id}`,
  myplaces: `/account/places`,
  newplace: `/account/places/new`,
  myplace: (id) => `/account/places/${id}`,
  profile: `/account/profile`,
  bookings: `/account/bookings`,
  mybooking: (id) => `/account/bookings/${id}`,
};

export const routes = [
  {
    index: true,
    element: <IndexPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/place/:id",
    element: <PlacePage />,
  },
  {
    path: "/account/profile",
    element: (
      <PrivateRoute>
        <ProfilePage />
      </PrivateRoute>
    ),
  },
  {
    path: "/account/places",
    element: (
      <PrivateRoute>
        <MyListPlaces />
      </PrivateRoute>
    ),
  },
  {
    path: "/account/places/new",
    element: (
      <PrivateRoute>
        <PlaceForm />
      </PrivateRoute>
    ),
  },
  {
    path: "/account/places/:id",
    element: (
      <PrivateRoute>
        <PlaceForm />
      </PrivateRoute>
    ),
  },
  {
    path: "/account/bookings",
    element: (
      <PrivateRoute>
        <BookingsPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/account/bookings/:id",
    element: (
      <PrivateRoute>
        <BookingPage />
      </PrivateRoute>
    ),
  },
];

export const RouteNotFound = <Route path="*" element={<Navigate to={"/"} />} />;
