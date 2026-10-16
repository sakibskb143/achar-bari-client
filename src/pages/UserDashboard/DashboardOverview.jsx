import { Heart, MapPin, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeading } from "../../components/common";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import { getOrdersByEmail } from "../../services/orderService";
import ProfileCard from "./ProfileCard";
import { useSavedAddresses } from "../../hooks/useSavedAddresses";

function DashboardOverview() {
  const { currentUser } = useAuth();
  const { wishlistItems } = useWishlist();
  const { addresses } = useSavedAddresses(currentUser?.email);

  const orders = getOrdersByEmail(currentUser?.email);

  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      icon: Package,
      path: "/dashboard/orders",
    },
    {
      label: "Wishlist Items",
      value: wishlistItems.length,
      icon: Heart,
      path: "/dashboard/wishlist",
    },
    {
      label: "Saved Addresses",
      value: addresses.length,
      icon: MapPin,
      path: "/dashboard/addresses",
    },
  ];

  return (
    <div>
      <SectionHeading
        align="left"
        eyebrow="Account Overview"
        title="Your AcharBari Account"
        description="View your account information and manage your shopping activity."
      />

      <ProfileCard />

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Link
              key={stat.label}
              to={stat.path}
              className="rounded-2xl border border-brand-secondary/15 bg-brand-surface p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-brand-primary/10 p-3 text-brand-primary">
                  <Icon size={22} aria-hidden="true" />
                </div>

                <p className="text-3xl font-bold text-brand-primary">
                  {stat.value}
                </p>
              </div>

              <p className="mt-5 font-semibold text-brand-text">{stat.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-brand-secondary/15 bg-brand-surface p-6 shadow-sm">
        <h2 className="text-xl font-bold text-brand-primary">
          Shopping with AcharBari
        </h2>

        <p className="mt-3 leading-7 text-brand-muted">
          Explore traditional pickle flavors, save your favorites, and track
          your demo orders from this dashboard.
        </p>
      </div>
    </div>
  );
}

export default DashboardOverview;
