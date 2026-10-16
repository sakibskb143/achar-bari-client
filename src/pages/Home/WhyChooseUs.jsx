import {
  Home,
  Leaf,
  Sparkles,
  Truck,
} from 'lucide-react'
import { reasons } from '../../data/homeData'
import { SectionHeading } from '../../components/common'

const iconMap = {
  home: Home,
  leaf: Leaf,
  truck: Truck,
  sparkles: Sparkles,
}

function WhyChooseUs() {
  return (
    <section className="bg-brand-primary px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Why AcharBari"
          title="Made With the Care You Can Taste"
          description="We bring the warmth of homemade flavors to modern everyday life."
          className="[&_h2]:text-white [&_p]:text-white/70"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => {
            const Icon = iconMap[reason.icon]

            return (
              <div
                key={reason.id}
                className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm"
              >
                <div className="mb-5 inline-flex rounded-xl bg-brand-accent p-3 text-brand-text">
                  <Icon
                    size={24}
                    aria-hidden="true"
                  />
                </div>

                <h3 className="text-lg font-semibold">
                  {reason.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/70">
                  {reason.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
