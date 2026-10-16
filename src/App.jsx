import {
  ButtonLoader,
  InlineLoader,
  LoadingOverlay,
  PageLoader,
  ProductSkeleton,
} from './components/loader'

function App() {
  return (
    <main className="min-h-screen bg-brand-background px-6 py-12 text-brand-text">
      <section className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-brand-secondary">
            AcharBari
          </p>

          <h1 className="text-4xl font-bold text-brand-primary">
            Loader Components
          </h1>

          <p className="mt-3 text-brand-muted">
            Phase 2A component test page
          </p>
        </div>

        <div className="space-y-10">
          <section className="rounded-2xl bg-brand-surface p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-brand-primary">
              Page Loader
            </h2>

            <PageLoader label="Loading AcharBari" />
          </section>

          <section className="rounded-2xl bg-brand-surface p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-brand-primary">
              Button Loader
            </h2>

            <button
              type="button"
              disabled
              className="btn bg-brand-primary text-white"
            >
              <ButtonLoader label="Saving" />
            </button>
          </section>

          <section className="rounded-2xl bg-brand-surface p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-brand-primary">
              Inline Loader
            </h2>

            <InlineLoader label="Loading products" />
          </section>

          <section className="rounded-2xl bg-brand-surface p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-brand-primary">
              Product Skeletons
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-brand-surface p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-brand-primary">
              Loading Overlay
            </h2>

            <LoadingOverlay
              isLoading
              label="Loading account information"
            >
              <div className="rounded-xl border border-brand-secondary/20 p-8">
                <h3 className="text-lg font-semibold">
                  Customer account
                </h3>

                <p className="mt-2 text-brand-muted">
                  Account content remains visible under the overlay.
                </p>
              </div>
            </LoadingOverlay>
          </section>
        </div>
      </section>
    </main>
  )
}

export default App
