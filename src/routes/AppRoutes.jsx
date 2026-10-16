import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import { Home } from '../pages/Home'
import { Shop } from '../pages/Shop'
import { ProductDetails } from '../pages/ProductDetails'
import { TasteFinder } from '../pages/TasteFinder'
import { BuildAcharBox } from '../pages/BuildAcharBox'
import { Cart } from '../pages/Cart'
import { Checkout } from '../pages/Checkout'
import {
  ForgotPassword,
  Login,
  Register,
} from '../pages/Auth'
import { UserDashboard } from '../pages/UserDashboard'
import { AdminDashboard } from '../pages/AdminDashboard'
import { NotFound } from '../pages/NotFound'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route
          path="/products/:productId"
          element={<ProductDetails />}
        />
        <Route
          path="/taste-finder"
          element={<TasteFinder />}
        />
        <Route
          path="/build-achar-box"
          element={<BuildAcharBox />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/dashboard"
          element={<UserDashboard />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
