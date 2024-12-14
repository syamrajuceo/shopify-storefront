import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { CartPage } from "../pages/CartPage";
import { ProfilePage } from "../pages/ProfilePage";
import { HomePage } from "../pages/HomePage";
import { ProductDetailsPage } from "../pages/ProductDetailsPage";
import { ProductListingPage } from "../pages/ProductListingPage";
import { UserLayout } from "../layout/UserLayout";
import ProtectedRoute from "../utils/ProtectedRoute";
import Navlayout from "../layout/Navlayout";
import SunGlasses from "../pages/Sunglasses";
import { ContactPage } from "../pages/ContactPage";

export const router = createBrowserRouter([
  {
    element: <Navlayout />,
    children: [
      {
        path: "/login",
        element: (
          <ProtectedRoute>
            <LoginPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <ProtectedRoute>
            <RegisterPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/products",
        element: <ProductListingPage />,
      },
      {
        path: "/product/:handle",
        element: <ProductDetailsPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/sunglasses",
        element:<SunGlasses/>
      },{

      },
      // User routes
      {
        element: <UserLayout />,
        children: [
          {
            path: "/cart",
            element: <CartPage />,
          },
          {
            path: "/profile",
            element: <ProfilePage />,
          },
        ],
      },]
  },
]);
