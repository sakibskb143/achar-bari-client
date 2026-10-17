
import { ArrowRight, Gift, Check, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/common'

const boxFeatures = [
  'Choose your favorite flavors',
  'Customize your gift box',
  'Perfect for every occasion',
]

function BuildBoxPromo() {
  return (
    <section className="bg-[#FFF9F1] px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[28px] bg-[#F4E9D9]">
          <div className="grid items-center lg:grid-cols-2">

            {/* Product Image */}
            <div className="relative order-2 min-h-[350px] p-5 sm:min-h-[460px] sm:p-8 lg:order-1 lg:min-h-[570px] lg:p-10">
              <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A47760]/15 sm:h-[370px] sm:w-[370px]" />

              <div className="relative z-10 h-[310px] overflow-hidden rounded-[24px] shadow-xl sm:h-[390px] lg:h-[490px]">
                <img
                  src="https://i.ibb.co/1Gmcf55d/Gemini-Generated-Image-jhx8ukjhx8ukjhx8.jpg"
                  alt="AcharBari homemade pickle jar and gift selection"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#302521]/55 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 text-white sm:bottom-7 sm:left-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                    Made for sharing
                  </p>
                  <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
                    A box full of love.
                  </h3>
                </div>
              </div>

              {/* Floating gift badge */}
              <div className="absolute right-2 top-8 z-20 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-lg sm:right-6 sm:top-12 sm:p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#53182F] text-white">
                  <Gift size={22} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#53182F]">
                    Your custom box
                  </p>
                  <p className="text-xs text-[#776963]">
                    Made just for you
                  </p>
                </div>
              </div>

              {/* Floating flavor badge */}
              <div className="absolute bottom-8 left-2 z-20 flex items-center gap-2 rounded-full border border-[#A47760]/15 bg-white px-4 py-3 shadow-lg sm:bottom-12 sm:left-6">
                <Sparkles size={17} className="text-[#A47760]" />
                <span className="text-sm font-semibold text-[#53182F]">
                  Your flavors, your way
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 px-6 pb-5 pt-12 sm:px-10 sm:pt-16 lg:order-2 lg:px-14 lg:py-20">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#A47760]/20 bg-white/70 px-4 py-2">
                <Gift size={16} className="text-[#A47760]" />
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#53182F]">
                  The perfect achar gift
                </span>
              </div>

              <h2 className="max-w-lg text-4xl font-extrabold leading-tight tracking-tight text-[#53182F] sm:text-5xl lg:text-6xl">
                More flavors.
                <span className="mt-2 block font-serif font-medium italic text-[#A47760]">
                  One special box.
                </span>
              </h2>

              <p className="mt-6 max-w-lg text-base leading-8 text-[#776963] sm:text-lg">
                Create a box that’s uniquely yours. Mix your favorite
                homemade achars, discover new flavors, and surprise someone
                special with a gift full of Bengali goodness.
              </p>

              {/* Benefits */}
              <ul className="mt-7 space-y-4">
                {boxFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm font-medium text-[#53182F] sm:text-base"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[#A47760]">
                      <Check size={15} strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link to="/build-achar-box">
                  <Button variant="accent">
                    Build My Achar Box
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>

                <span className="text-sm text-[#776963]">
                  Your box, your choice.
                </span>
              </div>

              <p className="mt-5 text-sm text-[#776963]/80">
                ঘরের স্বাদ, এবার দ্বারে।
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default BuildBoxPromo
