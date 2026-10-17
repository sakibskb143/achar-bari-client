import { Route, Routes } from "react-router-dom";

import { ForgotPassword, Login, Register } from "../pages/Auth";

import { BuildAcharBox } from "../pages/BuildAcharBox";
import { Cart } from "../pages/Cart";
import { Checkout } from "../pages/Checkout";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { OrderConfirmation } from "../pages/OrderConfirmation";
import { ProductDetails } from "../pages/ProductDetails";
import { Shop } from "../pages/Shop";
import { TasteFinder } from "../pages/TasteFinder";

import AdminLayout from "../layouts/AdminLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";

import {
  AdminOverview,
  CategoryManagement,
  CouponManagement,
  OrderManagement,
  ProductManagement,
  ReviewManagement,
  UserManagement,
} from "../pages/AdminDashboard";

import {
  DashboardOverview,
  EditProfile,
  OrderDetails,
  Orders,
  SavedAddresses,
  Wishlist,
} from "../pages/UserDashboard";

import { AdminRoute, UserRoute } from "./RoleRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public pages */}
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

        {/* Authentication pages */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Regular-user-only dashboard */}
        <Route element={<UserRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />

            <Route path="profile" element={<EditProfile />} />

            <Route path="orders" element={<Orders />} />

            <Route path="orders/:orderId" element={<OrderDetails />} />

            <Route path="wishlist" element={<Wishlist />} />

            <Route path="addresses" element={<SavedAddresses />} />
          </Route>
        </Route>

        {/* Admin-only dashboard */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminOverview />} />

            <Route path="products" element={<ProductManagement />} />

            <Route path="categories" element={<CategoryManagement />} />

            <Route path="orders" element={<OrderManagement />} />

            <Route path="users" element={<UserManagement />} />

            <Route path="reviews" element={<ReviewManagement />} />

            <Route path="coupons" element={<CouponManagement />} />
          </Route>
        </Route>

        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
