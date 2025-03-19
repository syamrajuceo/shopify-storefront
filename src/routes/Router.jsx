import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { CartPage } from "../pages/CartPage";
import ProfilePage from "../pages/ProfilePage";
import { HomePage } from "../pages/HomePage";
import { ProductDetailsPage } from "../pages/ProductDetailsPage";
// import { ProductListingPage } from "../pages/ProductListingPage";
import { UserLayout } from "../layout/UserLayout";
import ProtectedRoute from "../utils/ProtectedRoute";
import Navlayout from "../layout/Navlayout";
import CategoryPage from "../pages/CategoryPage";
import Offers from "../pages/Offers";
import SearchPage from "../pages/SearchPage";
import OrdersPage from "../pages/OrdersPage";
import OrderSummary from "../components/Order/OrderSummary";
import ShapePage from "../pages/ShapePage";
import ShopController from "../pages/ShopController";
import { ContactPage } from "../pages/ContactPage";
import { RefundPolicyPage } from "../pages/RefundPolicyPage";
import TermsAndConditions from "../pages/TermsAndConditions";
import PrivacyPolicyPage from "../pages/Privacy";
import ShippingDelivery from "../pages/ShippingDelivery";
import LoginRequiredComponent from "../components/auth/LoginRequiredComponent";


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
        element: < HomePage />,
      },
      {
        path: "/product/:handle",
        element: <ProductDetailsPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      }, {
        path: "/offer",
        element: <Offers />
      },
      {
        path: "/shop",
        element: <ShopController />
      },
      {
        path: "/shop/:type",
        element: <ShopController />
      },
      {
        path: "/category",
        element: <CategoryPage />
      },
      {
        path: "/query",
        element: <SearchPage />
      },
      {
        path: "/shape",
        element: <ShapePage />
      },
      {
        path: "/return-policy",
        element: <RefundPolicyPage />
      },
      {
        path: "/terms-and-conditions",
        element: <TermsAndConditions />
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicyPage />
      },
      {
        path: "/shipping-delivery",
        element: <ShippingDelivery />
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
            element: <LoginRequiredComponent redirect={"/login"}>
              <ProfilePage />
            </LoginRequiredComponent>,
          },
          {
            path: "/order",
            element: <LoginRequiredComponent redirect={"/login"}><OrdersPage /></LoginRequiredComponent>,
          },
          {
            path: "/ordersummary",
            element: <LoginRequiredComponent redirect={"/login"}><OrderSummary /></LoginRequiredComponent>,
          },
        ],
      },]
  },
]);
