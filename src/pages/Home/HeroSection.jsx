import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { heroSlides } from '../../data/homeData'
import { Button } from '../../components/common'

function HeroSection( ) {
  const [activeSlide, setActiveSlide] = useState(0)

  const currentSlide = heroSlides[activeSlide]

  const goToPrevious = () => {
    setActiveSlide((currentIndex) =>
      currentIndex === 0
        ? heroSlides.length - 1
        : currentIndex - 1,
    )
  }

  const goToNext = () => {
    setActiveSlide((currentIndex) =>
      currentIndex === heroSlides.length - 1
        ? 0
        : currentIndex + 1,
    )
  }

  return (
    <section className="relative overflow-hidden bg-brand-primary">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 md:min-h-[620px] md:grid-cols-2 md:py-20 lg:px-8">
        <div className="relative z-10 text-white">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-brand-accent">
            {currentSlide.eyebrow}
          </p>

          <h1 className="font-bengali text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
            {currentSlide.title}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
            {currentSlide.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/shop">
              <Button variant="accent">
                Shop Now
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                />
              </Button>
            </Link>

            <Link to="/taste-finder">
              <Button className="border-white bg-transparent text-white hover:bg-white hover:text-brand-primary">
                Find Your Taste
              </Button>
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <button
              type="button"
              onClick={goToPrevious}
              className="rounded-full border border-white/30 p-2 text-white transition hover:bg-white hover:text-brand-primary"
              aria-label="Previous hero slide"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>

            <div className="flex gap-2">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  className={[
                    'h-2 rounded-full transition-all',
                    index === activeSlide
                      ? 'w-8 bg-brand-accent'
                      : 'w-2 bg-white/40',
                  ].join(' ')}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={
                    index === activeSlide ? 'true' : undefined
                  }
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goToNext}
              className="rounded-full border border-white/30 p-2 text-white transition hover:bg-white hover:text-brand-primary"
              aria-label="Next hero slide"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-brand-accent/20 blur-2xl" />

          <img
            src={currentSlide.image}
            alt={currentSlide.imageAlt}
            className="relative h-[360px] w-full rounded-[2rem] object-cover shadow-2xl sm:h-[450px]"
          />

          <div className="absolute -bottom-5 -left-3 rounded-2xl bg-brand-surface px-5 py-4 shadow-xl sm:left-5">
            <p className="text-sm font-semibold text-brand-primary">
              Small-batch goodness
            </p>

            <p className="font-bengali text-sm text-brand-secondary">
              ভালোবাসায় তৈরি
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
