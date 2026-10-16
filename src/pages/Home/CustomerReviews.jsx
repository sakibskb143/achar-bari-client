import { Quote, Star } from 'lucide-react'
import { testimonials } from '../../data/homeData'
import { SectionHeading } from '../../components/common'

function CustomerReviews() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Happy Customers"
          title="Loved Across Families"
          description="Real words from customers who brought AcharBari home."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="relative rounded-2xl border border-brand-secondary/15 bg-brand-surface p-6 shadow-sm"
            >
              <Quote
                size={38}
                className="absolute right-5 top-5 text-brand-primary/10"
                aria-hidden="true"
              />

              <div className="flex gap-1 text-brand-accent">
                {Array.from({ length: testimonial.rating }).map(
                  (_, index) => (
                    <Star
                      key={index}
                      size={17}
                      fill="currentColor"
                      aria-hidden="true"
                    />
                  ),
                )}
              </div>

              <p className="mt-5 leading-8 text-brand-muted">
                “{testimonial.text}”
              </p>

              <div className="mt-6 border-t border-brand-secondary/15 pt-5">
                <p className="font-semibold text-brand-primary">
                  {testimonial.name}
                </p>

                <p className="mt-1 text-sm text-brand-secondary">
                  {testimonial.location}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CustomerReviews
