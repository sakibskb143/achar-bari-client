import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/common'

function TasteFinderPromo() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-3xl bg-brand-secondary md:grid-cols-2">
        <div className="p-8 text-white sm:p-12">
          <div className="mb-6 inline-flex rounded-full bg-white/15 p-3">
            <Sparkles
              size={26}
              className="text-brand-accent"
              aria-hidden="true"
            />
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
            Not sure what to choose?
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Let us find your perfect taste.
          </h2>

          <p className="mt-5 max-w-lg leading-8 text-white/80">
            Answer a few simple questions about your spice preference, taste, food pairing, and budget. We will recommend the pickles that fit you best.
          </p>

          <Link to="/taste-finder" className="mt-8 inline-block">
            <Button variant="accent">
              Start Taste Finder
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
          </Link>
        </div>

        <div className="relative min-h-[300px]">
          <img
            src="https://images.unsplash.com/photo-1599909533730-f9d9b7f7f8e2?auto=format&fit=crop&w=1000&q=85"
            alt="Colorful pickle ingredients in bowls"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-brand-primary/25" />
        </div>
      </div>
    </section>
   )
}

export default TasteFinderPromo
