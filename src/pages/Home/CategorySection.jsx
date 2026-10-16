import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categories } from '../../data/homeData'
import { SectionHeading } from '../../components/common'

function CategorySection() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Explore Flavors"
          title="Something Delicious for Every Table"
          description="From tangy mango to fiery chili, discover the flavor your meal has been waiting for."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.id}`}
              className="group overflow-hidden rounded-2xl bg-brand-surface shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-brand-text/70 via-transparent to-transparent" />

                <span className="absolute bottom-4 left-4 font-bengali text-lg font-semibold text-white">
                  {category.bengaliName}
                </span>
              </div>

              <div className="flex items-start justify-between gap-3 p-5">
                <div>
                  <h3 className="font-semibold text-brand-primary">
                    {category.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-brand-muted">
                    {category.description}
                  </p>
                </div>

                <span className="rounded-full bg-brand-primary/10 p-2 text-brand-primary transition group-hover:bg-brand-primary group-hover:text-white">
                  <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategorySection
