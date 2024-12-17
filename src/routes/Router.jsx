import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { CartPage } from "../pages/CartPage";
import  ProfilePage  from "../pages/ProfilePage";
import { HomePage } from "../pages/HomePage";
import { ProductDetailsPage } from "../pages/ProductDetailsPage";
import { ProductListingPage } from "../pages/ProductListingPage";
import { UserLayout } from "../layout/UserLayout";
import ProtectedRoute from "../utils/ProtectedRoute";
import Navlayout from "../layout/Navlayout";
import SunGlasses from "../pages/SunGlasses";
import { ContactPage } from "../pages/ContactPage";
import MenPage from "../pages/MenPage";
import WoMenPage from "../pages/WoMenPage";
import EyeGlasses from "../pages/EyeGlasses";
import ContactLenses from "../pages/ContactLenses";
import CategoryPage from "../pages/CategoryPage";
import Offers from "../pages/Offers";
import SearchPage from "../pages/SearchPage";
<<<<<<< HEAD
<<<<<<< HEAD
import Orderpage from "../components/Order/Orderpage.jsx";
=======
>>>>>>> 754fcbd133cae73e27303d1a916f349e9e19724b


=======
import OrdersPage from "../pages/OrdersPage";
>>>>>>> 969c52a48986cafcc7e77f1ded12a0a38de5914e

import OrdersPage from "../pages/OrdersPage";

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
      },
      {
        path: "/contactLenses",
        element:<ContactLenses/>
      },
      {
        path: "/eyeglasses",
        element:<EyeGlasses/>
      },
      {
        path: "/Men",
        element:<MenPage/>
      },
      {
        path: "/Women",
        element:<WoMenPage/>
      },{
        path: "/offer",
        element:<Offers/>
      },
      {
        path: "/category",
        element:<CategoryPage/>
      },
      {
        path: "/query",
        element:<SearchPage/>
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
          {
            path: "/order",
            element: <OrdersPage />,
          },
        ],
      },]
  },
]);
