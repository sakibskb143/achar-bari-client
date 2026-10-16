function App() {
  return (
    <main className="min-h-screen bg-brand-background px-6 py-16 text-brand-text">
      <section className="mx-auto max-w-4xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-brand-secondary">
          AcharBari
        </p>

        <h1 className="text-4xl font-bold text-brand-primary md:text-6xl">
          ঘরের স্বাদ, এবার দ্বারে।
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-brand-muted md:text-lg">
          The taste of home, now at your doorstep.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button className="btn border-brand-primary bg-brand-primary text-white hover:border-brand-primary hover:bg-brand-primary/90">
            Explore Pickles
          </button>

          <button className="btn btn-outline border-brand-primary text-brand-primary hover:border-brand-primary hover:bg-brand-primary hover:text-white">
            Find Your Taste
          </button>
        </div>
      </section>
    </main>
  )
}

export default App
