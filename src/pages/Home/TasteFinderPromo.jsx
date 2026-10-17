
import { ArrowRight, Sparkles, Check, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/common'

function TasteFinderPromo() {
  return (
    <section className="bg-[#FFF9F1] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[28px] bg-[#E8DFF5]">
          <div className="grid items-center lg:grid-cols-2">

            {/* Left: Promotional content */}
            <div className="relative z-10 px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
              {/* Eyebrow */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#A47760]/25 bg-white/70 px-4 py-2">
                <Sparkles
                  size={16}
                  className="text-[#A47760]"
                />
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#53182F]">
                  Your personal achar guide
                </span>
              </div>

              {/* Heading */}
              <h2 className="max-w-xl text-4xl font-extrabold leading-[1.12] tracking-tight text-[#53182F] sm:text-5xl lg:text-6xl">
                Your taste.
                <br />
                Your achar.
                <span className="mt-2 block font-serif font-medium italic text-[#A47760]">
                  Your perfect match.
                </span>
              </h2>

              <p className="mt-6 max-w-md text-base leading-8 text-[#776963] sm:text-lg">
                Every craving is different. Answer a few quick questions
                and discover the homemade pickle that belongs on your plate.
              </p>

              {/* Benefits */}
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3">
                {['Spice preference', 'Favorite flavors', 'Your budget'].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-sm font-medium text-[#53182F]"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {item}
                    </div>
                  )
                )}
              </div>

              {/* CTA */}
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link to="/taste-finder">
                  <Button variant="primary">
                    Find My Perfect Achar
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>

                <span className="text-sm text-[#776963]">
                  Takes just a minute
                </span>
              </div>
            </div>

            {/* Right: Product visual */}
            <div className="relative flex min-h-[380px] items-center justify-center p-6 sm:min-h-[460px] sm:p-10 lg:min-h-[580px]">
              {/* Decorative circles */}
              <div className="absolute h-[300px] w-[300px] rounded-full border border-[#A47760]/20 sm:h-[390px] sm:w-[390px]" />
              <div className="absolute h-[240px] w-[240px] rounded-full bg-[#A47760]/15 sm:h-[320px] sm:w-[320px]" />

              {/* Product image */}
              <div className="relative z-10 h-[300px] w-full max-w-[430px] overflow-hidden rounded-[24px] shadow-2xl sm:h-[390px]">
                <img
                  src="https://i.ibb.co/1Gmcf55d/Gemini-Generated-Image-jhx8ukjhx8ukjhx8.jpg"
                  alt="AcharBari homemade pickle jar"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#302521]/50 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                    Homemade goodness
                  </p>
                  <p className="mt-1 text-2xl font-bold">
                    A little jar of happiness.
                  </p>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute left-3 top-10 z-20 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-lg sm:left-6 sm:top-16 sm:p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F1E4D8] text-[#53182F]">
                  <Sparkles size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#53182F]">
                    Made with love
                  </p>
                  <p className="text-xs text-[#776963]">
                    Traditional flavors
                  </p>
                </div>
              </div>

              {/* Floating heart badge */}
              <div className="absolute bottom-10 right-3 z-20 flex items-center gap-2 rounded-full bg-white px-4 py-3 shadow-lg sm:bottom-16 sm:right-6">
                <Heart
                  size={17}
                  className="fill-[#A47760] text-[#A47760]"
                />
                <span className="text-sm font-semibold text-[#53182F]">
                  Picked for you
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default TasteFinderPromo
