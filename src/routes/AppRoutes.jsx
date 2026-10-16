import { Route, Routes } from "react-router-dom";
import { AdminDashboard } from "../pages/AdminDashboard";
import { ForgotPassword, Login, Register } from "../pages/Auth";
import { BuildAcharBox } from "../pages/BuildAcharBox";
import { Cart } from "../pages/Cart";
import { Checkout } from "../pages/Checkout";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { ProductDetails } from "../pages/ProductDetails";
import { Shop } from "../pages/Shop";
import { TasteFinder } from "../pages/TasteFinder";
//import { UserDashboard } from "../pages/UserDashboard";
import MainLayout from "../layouts/MainLayout";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import { OrderConfirmation } from "../pages/OrderConfirmation";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  DashboardOverview,
  EditProfile,
  OrderDetails,
  Orders,
  SavedAddresses,
  Wishlist,
} from "../pages/UserDashboard";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/taste-finder" element={<TasteFinder />} />
        <Route path="/build-achar-box" element={<BuildAcharBox />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/order-confirmation/:orderId"
          element={<OrderConfirmation />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardOverview />} />

            <Route path="/dashboard/profile" element={<EditProfile />} />

            <Route path="/dashboard/orders" element={<Orders />} />

            <Route
              path="/dashboard/orders/:orderId"
              element={<OrderDetails />}
            />

            <Route path="/dashboard/wishlist" element={<Wishlist />} />

            <Route path="/dashboard/addresses" element={<SavedAddresses />} />
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
