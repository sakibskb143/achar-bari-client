import { Menu, Search, UserRound } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import CartButton from "./CartButton";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";
//import { useAuth } from '../../context/AuthContext'

function Navbar({ onOpenCart }) {
  const navigate = useNavigate();
  const { cartItemCount } = useCart();
  const { currentUser, userRole, logoutUser } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-brand-secondary/15 bg-brand-background/95 backdrop-blur">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="shrink-0" aria-label="AcharBari home">
            <p className="text-xl font-bold tracking-tight text-brand-primary sm:text-2xl">
              AcharBari
            </p>

            <p className="font-bengali text-xs text-brand-secondary sm:text-sm">
              ঘরের স্বাদ, এবার দ্বারে।
            </p>
          </Link>

          {/* <DesktopNavigation currentUser={currentUser} /> */}
          <DesktopNavigation />

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="rounded-full p-2 text-brand-primary transition hover:bg-brand-primary/10"
              aria-label="Search products"
            >
              <Search size={21} strokeWidth={1.8} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => {
                if (!currentUser) {
                  navigate("/login");
                  return;
                }

                if (userRole === "admin") {
                  navigate("/admin");
                  return;
                }

                navigate("/dashboard");
              }}
              className="hidden rounded-full p-2 text-brand-primary transition hover:bg-brand-primary/10 sm:block"
              aria-label={
                currentUser ? "Open dashboard" : "Login or open profile"
              }
            >
              <UserRound size={21} strokeWidth={1.8} aria-hidden="true" />
            </button>

            <CartButton itemCount={cartItemCount} onClick={onOpenCart} />

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="rounded-full p-2 text-brand-primary transition hover:bg-brand-primary/10 lg:hidden"
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu size={23} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentUser={currentUser}
        userRole={userRole}
        onLogout={handleLogout}
      />
    </>
  );
}

export default Navbar;
