import { Heart, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { popularProducts } from "../../data/homeData";
import { Badge, Button, SectionHeading } from "../../components/common";

function PopularProductsSection() {
  return (
    <section className="bg-white/60 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Customer Favorites"
          title="Popular Pickles"
          description="Our most-loved flavors, selected by AcharBari customers."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {popularProducts.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-2xl border border-brand-secondary/15 bg-brand-surface shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <button
                  type="button"
                  className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-brand-primary shadow-sm transition hover:bg-brand-primary hover:text-white"
                  aria-label={`Add ${product.name} to wishlist`}
                >
                  <Heart size={19} aria-hidden="true" />
                </button>

                <Badge className="absolute bottom-4 left-4">
                  {product.spiceLevel} Spice
                </Badge>
              </div>

              <div className="p-5">
                <p className="font-bengali text-sm text-brand-secondary">
                  {product.bengaliName}
                </p>

                <h3 className="mt-1 text-lg font-semibold text-brand-primary">
                  {product.name}
                </h3>

                <div className="mt-3 flex items-center gap-2">
                  <div className="flex items-center gap-1 text-brand-accent">
                    <Star size={16} fill="currentColor" aria-hidden="true" />

                    <span className="text-sm font-semibold text-brand-text">
                      {product.rating}
                    </span>
                  </div>

                  <span className="text-sm text-brand-muted">
                    ({product.reviews} reviews)
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xl font-bold text-brand-primary">
                      ৳{product.price}
                    </p>

                    <p className="text-xs text-brand-muted">{product.weight}</p>
                  </div>

                  <Link to={`/products/${product.id}`}>
                    <Button size="sm">
                      <ShoppingBag size={16} aria-hidden="true" />
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/shop">
            <Button variant="outline">View All Pickles</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PopularProductsSection;
