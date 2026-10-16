import { ArrowRight, Gift } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/common'

function BuildBoxPromo() {
  return (
    <section className="px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-10 overflow-hidden rounded-3xl border border-brand-accent/40 bg-brand-accent/20 p-8 sm:p-12 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <img
            src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85"
            alt="A selection of homemade foods arranged together"
            className="h-[320px] w-full rounded-2xl object-cover shadow-lg sm:h-[400px]"
          />
        </div>

        <div className="order-1 md:order-2">
          <div className="mb-6 inline-flex rounded-full bg-brand-primary/10 p-3 text-brand-primary">
            <Gift
              size={26}
              aria-hidden="true"
            />
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-secondary">
            A delicious gift idea
          </p>

          <h2 className="mt-3 text-3xl font-bold text-brand-primary sm:text-4xl">
            Build your own achar box.
          </h2>

          <p className="mt-5 leading-8 text-brand-muted">
            Mix and match your favorite flavors, choose the perfect box size, and create a delicious gift for yourself or someone special.
          </p>

          <Link to="/build-achar-box" className="mt-8 inline-block">
            <Button>
              Create Your Box
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
   )
}

export default BuildBoxPromo
