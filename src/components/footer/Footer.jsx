
import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-secondary/15 bg-brand-primary text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div>
          <Link to="/" className="inline-block">
            <p className="text-2xl font-bold">AcharBari</p>
            <p className="font-bengali text-sm text-brand-accent">
              ঘরের স্বাদ, এবার দ্বারে।
            </p>
          </Link>

          <p className="mt-5 max-w-xs text-sm leading-7 text-white/75">
            Traditional homemade pickle flavors, prepared with care and
            delivered to your doorstep.
          </p>

          {/* Social Media */}
          <div className="mt-5 flex gap-3">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 font-bold transition hover:bg-brand-accent hover:text-brand-text"
              aria-label="AcharBari on Facebook"
            >
              f
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl transition hover:bg-brand-accent hover:text-brand-text"
              aria-label="AcharBari on Instagram"
            >
              ◎
            </a>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h2 className="text-lg font-semibold text-brand-accent">
            Explore
          </h2>

          <nav className="mt-4 flex flex-col gap-3 text-sm text-white/75">
            <Link to="/" className="transition hover:text-white">
              Home
            </Link>
            <Link to="/shop" className="transition hover:text-white">
              Shop
            </Link>
            <Link to="/taste-finder" className="transition hover:text-white">
              Taste Finder
            </Link>
            <Link
              to="/build-achar-box"
              className="transition hover:text-white"
            >
              Build Your Own Achar Box
            </Link>
          </nav>
        </div>

        {/* Customer Care */}
        <div>
          <h2 className="text-lg font-semibold text-brand-accent">
            Customer Care
          </h2>

          <nav className="mt-4 flex flex-col gap-3 text-sm text-white/75">
            <Link to="/cart" className="transition hover:text-white">
              Cart
            </Link>
            <Link to="/checkout" className="transition hover:text-white">
              Checkout
            </Link>
            <Link to="/login" className="transition hover:text-white">
              Login / Register
            </Link>
            <Link to="/dashboard" className="transition hover:text-white">
              My Account
            </Link>
          </nav>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-lg font-semibold text-brand-accent">
            Contact
          </h2>

          <div className="mt-4 space-y-4 text-sm text-white/75">
            <a
              href="tel:+8801000000000"
              className="flex items-start gap-3 transition hover:text-white"
            >
              <Phone
                size={18}
                className="mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <span>+880 1000-000000</span>
            </a>

            <a
              href="mailto:hello@acharbari.com"
              className="flex items-start gap-3 transition hover:text-white"
            >
              <Mail
                size={18}
                className="mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <span>hello@acharbari.com</span>
            </a>

            <div className="flex items-start gap-3">
              <MapPin
                size={18}
                className="mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <span>Chattogram, Bangladesh</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-center text-xs text-white/60 sm:px-6 md:flex-row md:items-center md:justify-between md:text-left lg:px-8">
          <p>© {currentYear} AcharBari. All rights reserved.</p>
          <p>Homemade taste, delivered with care.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
