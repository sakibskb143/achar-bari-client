import { Link } from 'react-router-dom'

function AuthPageLayout({
  eyebrow,
  title,
  description,
  children,
}) {
  return (
    <section className="flex min-h-[70vh] items-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl bg-brand-surface shadow-xl lg:grid-cols-2">
        <div className="hidden bg-brand-primary p-10 text-white lg:block">
          <Link to="/" className="inline-block">
            <p className="text-3xl font-bold">
              AcharBari
            </p>

            <p className="font-bengali text-brand-accent">
              ঘরের স্বাদ, এবার দ্বারে।
            </p>
          </Link>

          <div className="mt-24">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
              Welcome to AcharBari
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight">
              Keep your favorite flavors close.
            </h2>

            <p className="mt-5 leading-8 text-white/75">
              Save your wishlist, track your orders, and enjoy a smoother shopping experience.
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-secondary">
              {eyebrow}
            </p>

            <h1 className="mt-2 text-3xl font-bold text-brand-primary">
              {title}
            </h1>

            <p className="mt-3 leading-7 text-brand-muted">
              {description}
            </p>
          </div>

          {children}
        </div>
      </div>
    </section>
  )
}

export default AuthPageLayout
